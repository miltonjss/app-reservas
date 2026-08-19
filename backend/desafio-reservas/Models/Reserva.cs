namespace desafio_reservas.Models
{
    public class Reserva
    {
        public int Id { get; set; }
        public int SalaId { get; set; }
        public Sala? Sala { get; set; }
        public string? Titulo { get; set; }
        public DateTime HoraInicio { get; set; }
        public DateTime HoraFim { get; set; }
        public bool Cancelada { get; set; } = false;
    }
}
