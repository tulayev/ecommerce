using Entities.DTOs;
using MediatR;
using System.Security.Claims;

namespace Core.CQRS.Identity.Queries
{
    public record GetAuthorizedUserQuery(ClaimsPrincipal User) : IRequest<UserDto>;
}
