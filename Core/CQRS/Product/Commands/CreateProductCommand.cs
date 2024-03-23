using MediatR;

namespace Core.CQRS.Product.Commands
{
    public record CreateProductCommand() : IRequest<Entities.Product>;
}
