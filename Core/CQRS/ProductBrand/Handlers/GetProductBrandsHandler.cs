using Core.CQRS.ProductBrand.Queries;
using Core.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Core.CQRS.ProductBrand.Handlers
{
    public class GetProductBrandsHandler : IRequestHandler<GetProductBrandsQuery, IReadOnlyList<Entities.ProductBrand>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetProductBrandsHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IReadOnlyList<Entities.ProductBrand>> Handle(GetProductBrandsQuery request, CancellationToken cancellationToken)
        {
            return await _unitOfWork.GetQueryable<Entities.ProductBrand>().ToListAsync();
        }
    }
}
