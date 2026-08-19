using desafio_reservas.Data;
using desafio_reservas.DTOs;
using desafio_reservas.Models;
using desafio_reservas.Services;
using Microsoft.AspNetCore.Mvc;

namespace desafio_reservas.Controllers
{
    [Route("api/reserva")]
    [ApiController]
    
    public class ReservaController : ControllerBase
    {
        private readonly ReservaService _reservaService;

        public ReservaController(ReservaService reservaService)
        {
            _reservaService = reservaService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReservaDto>>> GetReservas()
        {
            var reservas = await _reservaService.GetReservasAsync();
            return Ok(reservas);
        }

        [HttpPost]
        public async Task<ActionResult<ReservaDto>> PostReservas(CriarReservaDto dto)
        {
            try
            {
                var reserva = await _reservaService.AddReservaAsync(dto);
                return StatusCode(201,reserva);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { mensagem = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> CancelarReserva(int id)
        {
            var sucesso = await _reservaService.CancelarReserva(id);
            if (!sucesso)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
