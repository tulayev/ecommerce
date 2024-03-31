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
            var productsQueryable = _unitOfWork.GetQueryable<Entities.Product>()
                .Where(x =>
                    (string.IsNullOrWhiteSpace(request.QueryParams.Search) || x.Name.ToLower().Contains(request.QueryParams.Search)) &&
                    (!request.QueryParams.BrandId.HasValue || x.ProductBrandId == request.QueryParams.BrandId) &&
                    (!request.QueryParams.TypeId.HasValue || x.ProductTypeId == request.QueryParams.TypeId))
                .Include(x => x.ProductType)
                .Include(x => x.ProductBrand)
                .Skip(request.QueryParams.PageSize * (request.QueryParams.PageNumber - 1))
                .Take(request.QueryParams.PageSize)
                .OrderBy(x => x.Name);

            if (!string.IsNullOrWhiteSpace(request.QueryParams.Sort))
            {
                productsQueryable = request.QueryParams.Sort switch
                {
                    "priceAsc" => productsQueryable.OrderBy(x => x.Price),
                    "priceDesc" => productsQueryable.OrderByDescending(x => x.Price),
                    _ => productsQueryable.OrderBy(x => x.Name),
                };
            }

            var products = await productsQueryable.ToListAsync();

            return _mapper.Map<IReadOnlyList<Entities.Product>, IReadOnlyList<ProductDto>>(products);
        }
    }
}
