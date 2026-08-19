using desafio_reservas.Data.Map;
using desafio_reservas.Models;
using Microsoft.EntityFrameworkCore;

namespace desafio_reservas.Data
{
    public class ReservasDbContext : DbContext
    {
        public ReservasDbContext(DbContextOptions<ReservasDbContext> options) : base (options)
        {
            
        }

        public DbSet<Reserva> Reservas { get; set; }
        public DbSet<Sala> Salas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ReservaMap());
            modelBuilder.Entity<Sala>().HasData(
                new Sala { Id = 1, Nome = "Sala Azul" },
                new Sala { Id = 2, Nome = "Sala Verde" },
                new Sala { Id = 3, Nome = "Sala Amarela"}
                );
            base.OnModelCreating(modelBuilder);
        }
    }
}
