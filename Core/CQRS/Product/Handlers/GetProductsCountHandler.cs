using Core.CQRS.Product.Queries;
using Core.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Core.CQRS.Product.Handlers
{
    public class GetProductsCountHandler : IRequestHandler<GetProductsCountQuery, int>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetProductsCountHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<int> Handle(GetProductsCountQuery request, CancellationToken cancellationToken)
        {
            var productsQueryable = _unitOfWork.GetQueryable<Entities.Product>()
                .Where(x =>
                    (string.IsNullOrWhiteSpace(request.QueryParams.Search) || x.Name.ToLower().Contains(request.QueryParams.Search)) &&
                    (!request.QueryParams.BrandId.HasValue || x.ProductBrandId == request.QueryParams.BrandId) &&
                    (!request.QueryParams.TypeId.HasValue || x.ProductTypeId == request.QueryParams.TypeId)
                );

            return await productsQueryable.CountAsync();
        }
    }
}
