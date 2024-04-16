using Entities;
using Microsoft.AspNetCore.Identity;

namespace Data.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Артём",
                    Email = "artemka@nok.uz",
                    UserName = "artemka@nok.uz",
                    Address = new Address
                    {
                        FirstName = "Артём",
                        LastName = "Пушков",
                        Street = "проспект Сталина",
                        City = "Омск",
                        State = "Омская область",
                        Zipcode = "644001"
                    }
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}
