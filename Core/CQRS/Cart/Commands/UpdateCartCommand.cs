using Entities;
using Entities.DTOs;
using MediatR;

namespace Core.CQRS.Cart.Commands
{
    public record UpdateCartCommand(CustomerCartDto CartDto) : IRequest<CustomerCart>;
}
