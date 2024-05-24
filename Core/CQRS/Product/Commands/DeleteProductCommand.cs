using MediatR;

namespace Core.CQRS.Product.Commands
{
    public record DeleteProductCommand(int Id) : IRequest<Unit>;
}
