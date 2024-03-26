using MediatR;

namespace Core.CQRS.ProductType.Queries
{
    public record GetProductTypesQuery : IRequest<IReadOnlyList<Entities.ProductType>>;
}
