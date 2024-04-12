using Entities;
using MediatR;

namespace Core.CQRS.Cart.Commands
{
    public record UpdateCartCommand(CustomerCart Cart) : IRequest<CustomerCart>;
}
