using Entities;
using System.Text.Json;

namespace Data
{
    public class DataContextSeed
    {
        private const string SeedDataBasePath = "../Data/SeedData";

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

            if (context.ChangeTracker.HasChanges())
            {
                await context.SaveChangesAsync();
            }
        }
    }
}
