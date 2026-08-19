namespace desafio_reservas.DTOs
{
    public class CriarReservaDto
    {
        public int SalaId { get; set; }
        public string? Titulo { get; set; }
        public DateTime HoraInicio { get; set; }
        public DateTime HoraFim { get; set; }
    }
}
