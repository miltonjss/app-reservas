namespace desafio_reservas.DTOs
{
    public class ReservaDto
    {
        public int Id { get; set; }
        public string? Titulo { get; set; }
        public string? SalaNome { get; set; }
        public DateTime HoraInicio { get; set; }
        public DateTime HoraFim { get; set; }
        
    }
}
