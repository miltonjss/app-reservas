using desafio_reservas.Data;
using desafio_reservas.DTOs;
using desafio_reservas.Models;
using Microsoft.EntityFrameworkCore;

namespace desafio_reservas.Services
{
    public class ReservaService
    {
        private readonly ReservasDbContext _context;

        public ReservaService(ReservasDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ReservaDto>> GetReservasAsync()
        {
            return await _context.Reservas.Where(x => !x.Cancelada).OrderBy(x => x.HoraInicio).Include(x => x.Sala).Select(x => new ReservaDto
            {
                Id = x.Id,
                Titulo = x.Titulo,
                SalaNome = x.Sala.Nome,
                HoraInicio = x.HoraInicio,
                HoraFim = x.HoraFim
            }).ToListAsync();

            
        }

        public async Task<ReservaDto> AddReservaAsync(CriarReservaDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Titulo))
            {
                throw new ArgumentException("Título é obrigatório");
            }

            if (dto.HoraFim <= dto.HoraInicio)
            {
                throw new ArgumentException("Horário de fim deve ser após o início");
            }

            var sala = await _context.Salas.FirstOrDefaultAsync(x => x.Id == dto.SalaId);
            if (sala == null)
            {
                throw new ArgumentException("Sala não encontrada");
            }

            bool conflito = await _context.Reservas.AnyAsync(x => !x.Cancelada &&
            x.SalaId == dto.SalaId &&
            dto.HoraInicio < x.HoraFim &&
            dto.HoraFim > x.HoraInicio);

            if (conflito)
            {
                throw new InvalidOperationException("Já existe uma reserva nesse horário para essa sala");
            }

            var reserva = new Reserva
            {
                SalaId = dto.SalaId,
                Titulo = dto.Titulo,
                HoraInicio = dto.HoraInicio,
                HoraFim = dto.HoraFim,
            };

            await _context.Reservas.AddAsync(reserva);
            await _context.SaveChangesAsync();
            return new ReservaDto
            {
                Id = reserva.Id,
                Titulo = reserva.Titulo,
                SalaNome = sala.Nome,
                HoraInicio = reserva.HoraInicio,
                HoraFim = reserva.HoraFim
            };
        }

        public async Task<bool> CancelarReserva(int id)
        {
            var reserva = await _context.Reservas.FirstOrDefaultAsync(x => x.Id == id);
            if (reserva == null || reserva.Cancelada)
            {
                return false;
            }

            reserva.Cancelada = true;
            await _context.SaveChangesAsync();
            return true;
        }
    }

    
}
