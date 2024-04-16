using Entities.DTOs;
using MediatR;

namespace Core.CQRS.Identity.Commands
{
    public record RegisterCommand(RegisterDto RegisterDto) : IRequest<UserDto>;
}
