using AutoMapper;
using Core.CQRS.Review.Commands;
using Core.Extensions;
using Core.Repositories;
using Core.Services.ElasticSearch;
using Entities;
using Entities.DTOs;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Core.CQRS.Review.Handlers
{
    public class CreateReviewHandler : IRequestHandler<CreateReviewCommand, ReviewDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IElasticClientService _client;
        private readonly UserManager<AppUser> _userManager;

        public CreateReviewHandler(IUnitOfWork unitOfWork, IMapper mapper, IElasticClientService client, UserManager<AppUser> userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _client = client;
            _userManager = userManager;
        }

        private async Task AddReviewToElasticSearch(int productId)
        {
            var product = await _unitOfWork.GetQueryable<Entities.Product>()
                .Include(x => x.ProductBrand)
                .Include(x => x.ProductType)
                .Include(x => x.Reviews)
                .FirstOrDefaultAsync(x => x.Id == productId);

            var elasticItem = _mapper.Map<ProductDto>(product);

            var documentExists = await _client.DocumentExistsAsync<ProductDto>(product.Id);

            if (documentExists.Exists)
                await _client.RemoveFromElasticIndexAsync<ProductDto>(product.Id);
            
            await _client.AddToElasticIndexAsync(elasticItem);
        }

        public async Task<ReviewDto> Handle(CreateReviewCommand command, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindUserByClaimsPrincipleWithAddress(command.User);
            
            var review = new Entities.Review
            {
                AuthorId = user.Id,
                ProductId = command.ReviewDto.ProductId,
                Body = command.ReviewDto.Body,
                CreatedAt = DateTime.UtcNow
            };

            await _unitOfWork.AddAsync(review);
            
            try
            {
                await _unitOfWork.SaveChangesAsync();
            }
            catch
            {
                return null;
            }

            await AddReviewToElasticSearch(command.ReviewDto.ProductId);

            return _mapper.Map<ReviewDto>(review);
        }
    }
}
