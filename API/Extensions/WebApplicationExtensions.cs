using AutoMapper;
using Core.Services.ElasticSearch;
using Data;
using Entities;
using Entities.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class WebApplicationExtensions
    {
        public async static Task<WebApplication> MigrateDatabaseAsync(this WebApplication app)
        {
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                try
                {
                    var db = services.GetRequiredService<DataContext>();
                    var userManager = services.GetRequiredService<UserManager<AppUser>>();
                    var client = services.GetRequiredService<IElasticClientService>();
                    var mapper = services.GetRequiredService<IMapper>();
                    // Migrate the db
                    await db.Database.MigrateAsync();
                    // Seed data
                    await DataContextSeed.SeedAsync(db);
                    await DataContextSeed.SeedUsersAsync(userManager);
                    // Seed elasticsearch data
                    var data = db.Products
                        .Include(x => x.ProductBrand)
                        .Include(x => x.ProductType)
                        .Include(x => x.Reviews)
                        .ToList();

                    var products = mapper.Map<List<ProductDto>>(data);

                    foreach (var product in products)
                    {
                        await client.AddToElasticIndexAsync(product);
                    }
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred while migrating the database.");
                }
            }

            return app;
        }
    }
}
