using AutoMapper;
using Core.CQRS.Product.Commands;
using Core.Repositories;
using Core.Services.ImageUpload;
using Entities;
using Entities.DTOs.Product;
using MediatR;

namespace Core.CQRS.Product.Handlers
{
    public class CreateProductHandler : IRequestHandler<CreateProductCommand, ProductDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;

        public CreateProductHandler(IUnitOfWork unitOfWork, IImageService imageService, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _imageService = imageService;
            _mapper = mapper;
        }

        public async Task<ProductDto> Handle(CreateProductCommand command, CancellationToken cancellationToken)
        {
            var result = await _imageService.UploadImage(command.Image);

            if (result.Error != null)
                return null;

            var product = new Entities.Product
            {
                Name = command.CreateProductDto.Name,
                Description = command.CreateProductDto.Description,
                Price = command.CreateProductDto.Price,
                ProductTypeId = command.CreateProductDto.ProductType,
                ProductBrandId = command.CreateProductDto.ProductBrand
            };

            await _unitOfWork.AddAsync(product);
            await _unitOfWork.SaveChangesAsync();

            var productImage = new Photo
            {
                Url = result.Url.AbsoluteUri,
                PublicId = result.PublicId,
                ProductId = product.Id
            };

            await _unitOfWork.AddAsync(productImage);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<ProductDto>(product);
        }
    }
}
