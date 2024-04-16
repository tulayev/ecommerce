using Entities.DTOs;
using MediatR;

namespace Core.CQRS.Identity.Commands
{
    public record LoginCommand(LoginDto LoginDto) : IRequest<UserDto>;
}
