using Core.CQRS.ProductType.Queries;
using Core.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Core.CQRS.ProductType.Handlers
{
    public class GetProductTypesHandler : IRequestHandler<GetProductTypesQuery, IReadOnlyList<Entities.ProductType>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetProductTypesHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IReadOnlyList<Entities.ProductType>> Handle(GetProductTypesQuery request, CancellationToken cancellationToken)
        {
            return await _unitOfWork.GetQueryable<Entities.ProductType>().ToListAsync();
        }
    }
}
