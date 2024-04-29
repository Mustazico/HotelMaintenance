using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Context
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Room> Room { get; set; }
        public DbSet<UserData> UserData { get; set; }
        public DbSet<Reservation> Reservation { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> contextOptions) : base(contextOptions)
        {

        }
    }
}
