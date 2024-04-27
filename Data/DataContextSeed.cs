using Entities;
using Entities.Orders;
using Microsoft.AspNetCore.Identity;
using System.Text.Json;

namespace Data
{
    public class DataContextSeed
    {
        private static readonly string SeedDataBasePath = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development"
            ? "../Data/SeedData"
            : "./Data/SeedData";

        public static async Task SeedAsync(DataContext context)
        {
            if (!context.ProductBrands.Any())
            {
                var data = File.ReadAllText($"{SeedDataBasePath}/brands.json");
                var items = JsonSerializer.Deserialize<List<ProductBrand>>(data);
                context.ProductBrands.AddRange(items);
            }
            
            if (!context.ProductTypes.Any())
            {
                var data = File.ReadAllText($"{SeedDataBasePath}/types.json");
                var items = JsonSerializer.Deserialize<List<ProductType>>(data);
                context.ProductTypes.AddRange(items);
            }
            
            if (!context.Products.Any())
            {
                var data = File.ReadAllText($"{SeedDataBasePath}/products.json");
                var items = JsonSerializer.Deserialize<List<Product>>(data);
                context.Products.AddRange(items);
            }

            if (!context.DeliveryMethods.Any())
            {
                var data = File.ReadAllText($"{SeedDataBasePath}/delivery.json");
                var items = JsonSerializer.Deserialize<List<DeliveryMethod>>(data);
                context.DeliveryMethods.AddRange(items);
            }

            if (context.ChangeTracker.HasChanges())
            {
                await context.SaveChangesAsync();
            }
        }

        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Артём",
                    Email = "artemka@nok.uz",
                    UserName = "artemka@nok.uz",
                    Address = new Entities.Address
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
