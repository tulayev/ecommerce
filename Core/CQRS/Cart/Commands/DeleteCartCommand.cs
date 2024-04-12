using MediatR;

namespace Core.CQRS.Cart.Commands
{
    public record DeleteCartCommand(string CartId) : IRequest<bool>;
}
