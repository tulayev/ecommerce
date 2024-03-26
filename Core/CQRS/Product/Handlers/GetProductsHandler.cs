using AutoMapper;
using Core.CQRS.Product.Queries;
using Core.Repositories;
using Entities.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Core.CQRS.Product.Handlers
{
    public class GetProductsHandler : IRequestHandler<GetProductsQuery, IReadOnlyList<ProductDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetProductsHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IReadOnlyList<ProductDto>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
        {
            var products = await _unitOfWork.GetQueryable<Entities.Product>()
                .Include(x => x.ProductBrand)
                .Include(x => x.ProductType)
                .ToListAsync();

            return _mapper.Map<IReadOnlyList<Entities.Product>, IReadOnlyList<ProductDto>>(products);
        }
    }
}
