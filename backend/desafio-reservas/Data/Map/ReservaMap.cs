using desafio_reservas.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace desafio_reservas.Data.Map
{
    public class ReservaMap : IEntityTypeConfiguration<Reserva>
    {
        public void Configure(EntityTypeBuilder<Reserva> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.SalaId);
            builder.HasOne(x => x.Sala).WithMany().HasForeignKey(x => x.SalaId).IsRequired();
            builder.Property(x => x.Titulo).IsRequired().HasMaxLength(200);
            builder.Property(x => x.HoraInicio).IsRequired();
            builder.Property(x => x.HoraFim).IsRequired();
            builder.Property(x => x.Cancelada).IsRequired().HasDefaultValue(false);
        }
    }
}
