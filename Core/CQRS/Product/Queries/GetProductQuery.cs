using Entities.DTOs;
using MediatR;

namespace Core.CQRS.Product.Queries
{
    public record GetProductQuery(int Id) : IRequest<ProductDto>;
}
