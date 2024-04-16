using Entities.DTOs;
using MediatR;
using System.Security.Claims;

namespace Core.CQRS.Identity.Commands
{
    public record UpdateUserAddressCommand(ClaimsPrincipal User, AddressDto AddressDto) : IRequest<AddressDto>;
}
