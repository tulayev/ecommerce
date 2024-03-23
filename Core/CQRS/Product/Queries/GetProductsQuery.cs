using MediatR;

namespace Core.CQRS.Product.Queries
{
    public record GetProductsQuery() : IRequest<IEnumerable<Entities.Product>>;
}
