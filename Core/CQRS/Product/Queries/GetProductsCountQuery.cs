using Core.Helpers;
using MediatR;

namespace Core.CQRS.Product.Queries
{
    public record GetProductsCountQuery(ProductQueryParams QueryParams) : IRequest<int>;
}
