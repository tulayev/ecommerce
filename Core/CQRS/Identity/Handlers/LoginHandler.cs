using Core.CQRS.Identity.Commands;
using Core.Services.Token;
using Entities;
using Entities.DTOs;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Core.CQRS.Identity.Handlers
{
    public class LoginHandler : IRequestHandler<LoginCommand, UserDto>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;

        public LoginHandler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        public async Task<UserDto> Handle(LoginCommand command, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByEmailAsync(command.LoginDto.Email);

            var result = await _signInManager.CheckPasswordSignInAsync(user, command.LoginDto.Password, false);

            if (!result.Succeeded)
                return null;

            return new UserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }
    }
}
