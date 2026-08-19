import { useState } from "react";
import { CriarReserva } from "../../services/reservas-services/reservaApi";

const SALAS = [
  { id: 1, nome: "Sala Azul" },
  { id: 2, nome: "Sala Verde" },
  { id: 3, nome: "Sala Amarela" },
];

function ReservaForm() {
  const [form, setForm] = useState({
    salaId: "",
    titulo: "",
    horaInicio: "",
    horaFim: "",
  });

  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    setSucesso(null);

    try {
      setEnviando(true);
      await CriarReserva({
        salaId: Number(form.salaId),
        titulo: form.titulo,
        horaInicio: form.horaInicio,
        horaFim: form.horaFim,
      });

      setSucesso("Reserva criada com sucesso!");
      setForm({
        salaId: "",
        titulo: "",
        horaInicio: "",
        horaFim: "",
      });
    } catch (error) {
      const mensagem =
        error.response?.data?.mensagem || "Erro ao criar reserva";
      setErro(mensagem);
    }
    setEnviando(false);
  };

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 border-t-4 border-blue-600 bg-white rounded-lg shadow-sm p-6"
        >
          <h1>Nova Reserva</h1>
          <div>
            <label>Sala</label>
            <select
              name="salaId"
              value={form.salaId}
              onChange={handleChange}
              className="w-full border border-gray-600 mb-1"
            >
              <option value="" disabled hidden>
                -- Selecione uma sala --
              </option>
              {SALAS.map((sala) => (
                <option key={sala.id} value={sala.id}>
                  {sala.nome}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Título</label>
            <input
              type="text"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              placeholder="Reunião de time"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Início</label>
              <input
                type="datetime-local"
                name="horaInicio"
                value={form.horaInicio}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Fim</label>
              <input
                type="datetime-local"
                name="horaFim"
                value={form.horaFim}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          {erro && (
            <div className="bg-red-50 text-red-800 text-sm rounded-md p-2">
              {erro}
            </div>
          )}

          {sucesso && (
            <div className="bg-green-50 text-green-800 text-sm rounded-md p-2">
              {sucesso}
            </div>
          )}

          <button
            type="submit"
            disabled={enviando}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md p-2 disabled:opacity-50"
          >
            Confirmar reserva
          </button>
        </form>
      </div>
    </>
  );
}

export default ReservaForm;
