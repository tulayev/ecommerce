using Core.CQRS.Identity.Commands;
using Core.Services.Token;
using Entities;
using Entities.DTOs;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Core.CQRS.Identity.Handlers
{
    public class RegisterHandler : IRequestHandler<RegisterCommand, UserDto>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;

        public RegisterHandler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        public async Task<UserDto> Handle(RegisterCommand command, CancellationToken cancellationToken)
        {
            var user = new AppUser
            {
                DisplayName = command.RegisterDto.DisplayName,
                Email = command.RegisterDto.Email,
                UserName = command.RegisterDto.Email
            };

            var result = await _userManager.CreateAsync(user, command.RegisterDto.Password);

            if (!result.Succeeded) 
                return null;

            return new UserDto
            {
                DisplayName = user.DisplayName,
                Token = _tokenService.CreateToken(user),
                Email = user.Email
            };
        }
    }
}
