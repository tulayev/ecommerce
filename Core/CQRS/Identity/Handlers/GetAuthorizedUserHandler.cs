using Core.CQRS.Identity.Queries;
using Core.Extensions;
using Core.Services.Token;
using Entities;
using Entities.DTOs;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Core.CQRS.Identity.Handlers
{
    public class GetAuthorizedUserHandler : IRequestHandler<GetAuthorizedUserQuery, UserDto>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;

        public GetAuthorizedUserHandler(UserManager<AppUser> userManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        public async Task<UserDto> Handle(GetAuthorizedUserQuery request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByEmailFromClaimsPrincipal(request.User);

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }
    }
}
