using AutoMapper;
using Core.CQRS.Product.Queries;
using Core.Repositories;
using Entities.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Core.CQRS.Product.Handlers
{
    public class GetProductHandler : IRequestHandler<GetProductQuery, ProductDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetProductHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ProductDto> Handle(GetProductQuery request, CancellationToken cancellationToken)
        {
            return await _mapper.ProjectTo<ProductDto>(_unitOfWork.GetQueryable<Entities.Product>())
                .FirstOrDefaultAsync(x => x.Id == request.Id);
        }
    }
}
