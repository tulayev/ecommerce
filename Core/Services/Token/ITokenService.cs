using Entities;

namespace Core.Services.Token
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}
