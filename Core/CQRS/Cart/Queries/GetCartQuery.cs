using Entities;
using MediatR;

namespace Core.CQRS.Cart.Queries
{
    public record GetCartQuery(string CartId) : IRequest<CustomerCart>;
}
