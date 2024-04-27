using Entities;

namespace Core.Services.Token
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
