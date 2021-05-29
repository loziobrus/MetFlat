using MetFlat.Model.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MetFlat.DataAccess
{
    public class MetFlatContext : IdentityDbContext
    {
        public MetFlatContext(DbContextOptions options) : base(options) { }

        public DbSet<User> User { get; set; }

        public DbSet<Address> Address { get; set; }

        public DbSet<Flat> Flat { get; set; }

        public DbSet<Facility> Facility { get; set; }

        public DbSet<Rental> Rental { get; set; }

        public DbSet<Photo> Photos { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<User>(entity =>
            {
                entity.HasMany(e => e.Flats)
                .WithOne(e => e.Owner)
                .HasForeignKey(e => e.OwnerId);

                entity.HasMany(e => e.Rentals)
                .WithOne(e => e.Tenant)
                .HasForeignKey(e => e.TenantId);

                entity.Property(e => e.Id).ValueGeneratedOnAdd();
            });
            builder.Entity<Flat>(entity =>
            {
                entity.HasMany(e => e.Facilities)
                .WithOne(e => e.Flat)
                .HasForeignKey(e => e.FlatId);

                entity.HasMany(e => e.Rentals)
                .WithOne(e => e.Flat)
                .HasForeignKey(e => e.FlatId);

                entity.HasMany(e => e.Photos)
                .WithOne(e => e.Flat)
                .HasForeignKey(e => e.FlatId);
            });
        }
    }
}
