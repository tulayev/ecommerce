using Entities.DTOs;
using MediatR;
using System.Security.Claims;

namespace Core.CQRS.Identity.Queries
{
    public record GetUserAddressQuery(ClaimsPrincipal User) : IRequest<AddressDto>;
}
