using MediatR;

namespace Core.CQRS.Identity.Queries
{
    public record CheckEmailExistsQuery(string Email) : IRequest<bool>;
}
