using Core.CQRS.Product.Queries;
using Core.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Core.CQRS.Product.Handlers
{
    public class GetProductsHandler : IRequestHandler<GetProductsQuery, IEnumerable<Entities.Product>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetProductsHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Entities.Product>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
        {
            return await _unitOfWork.GetQueryable<Entities.Product>().ToListAsync();
        }
    }
}
