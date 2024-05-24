using Core.Helpers;
using Entities.DTOs.Product;
using MediatR;

namespace Core.CQRS.Product.Queries
{
    public record GetProductsQuery(ProductQueryParams QueryParams) : IRequest<IReadOnlyList<ProductDto>>;
}
