using MediatR;

namespace Core.CQRS.ProductBrand.Queries
{
    public record GetProductBrandsQuery : IRequest<IReadOnlyList<Entities.ProductBrand>>;
}
