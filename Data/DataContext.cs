using Entities;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class DataContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<Product> Products { get; set; }
    }
}
