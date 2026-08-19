function CardReserva({ titulo, salaNome, horaInicio, horaFim, onCancel }) {
  return (
    <div className="ml-2">
      <div
        className={`flex justify-between items-center rounded-lg shadow-sm p-4 mb-3 border border-l-8 border-gray-300 ${salaNome == "Sala Azul" ? "border-l-blue-500" : salaNome == "Sala Verde" ? "border-l-green-500" : "border-l-yellow-500"} w-[80%]`}
      >
        <div className="flex gap-12">
          <div>
            <p className="">
              {new Date(horaInicio).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              {" - "}
              {new Date(horaFim).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-800">{titulo}</h3>
            <p
              className={`font-medium ${salaNome == "Sala Azul" ? "text-blue-500" : salaNome == "Sala Verde" ? "text-green-500" : "text-yellow-500"}`}
            >
              {salaNome}
            </p>
          </div>
        </div>

        <button
          onClick={onCancel}
          className="bg-red-600 hover:bg-red-700 text-white p-2 font-medium rounded-md"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default CardReserva;
