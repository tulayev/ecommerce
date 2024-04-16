using Core.CQRS.Identity.Queries;
using Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Core.CQRS.Identity.Handlers
{
    public class CheckEmailExistsHandler : IRequestHandler<CheckEmailExistsQuery, bool>
    {
        private readonly UserManager<AppUser> _userManager;

        public CheckEmailExistsHandler(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<bool> Handle(CheckEmailExistsQuery request, CancellationToken cancellationToken)
        {
            return await _userManager.FindByEmailAsync(request.Email) != null;
        }
    }
}
