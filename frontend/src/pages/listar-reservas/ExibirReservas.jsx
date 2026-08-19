import { useEffect, useState } from "react";
import CardReserva from "../../components/card-reserva/CardReserva";
import {
  CancelarReserva,
  GetReservas,
} from "../../services/reservas-services/reservaApi";
import Paginacao from "../../components/paginacao/paginacao";
import { FaList } from "react-icons/fa";
import ModalConfirmacao from "../../components/modal-confirmacao/ModalConfirmacao";

const ITENS_POR_PAGINA = 6;

function ExibirReservas() {
  const [reservas, setReservas] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [cancelamento, setCancelamento] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await GetReservas();
        console.log("reservas recebidas: ", data);
        setReservas(data);
      } catch (error) {
        console.error("Erro ao buscar reservas", error);
      }
    }
    fetchData();
  }, []);

  const solicitarCancelamento = (reserva) => {
    setCancelamento(reserva);
  };

  const confirmarCancelamento = async () => {
    try {
      await CancelarReserva(cancelamento.id);
      setReservas((prev) => {
        const novas = prev.filter((x) => x.id !== cancelamento.id);
        const totalPaginasAtualizadas = Math.ceil(
          novas.length / ITENS_POR_PAGINA,
        );

        if (pagina > totalPaginasAtualizadas) {
          setPagina(totalPaginasAtualizadas || 1);
        }

        return novas;
      });
    } catch (error) {
      console.error("Erro ao cancelar reserva", error);
    } finally {
      setCancelamento(null);
    }
  };

  const inicio = (pagina - 1) * ITENS_POR_PAGINA;
  const fim = inicio + ITENS_POR_PAGINA;
  const reservaDaPagina = reservas.slice(inicio, fim);
  const totalPaginas = Math.ceil(reservas.length / ITENS_POR_PAGINA);

  const reservasPorDia = reservaDaPagina.reduce((grupo, reserva) => {
    const dia = new Date(reserva.horaInicio).toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    if (!grupo[dia]) {
      grupo[dia] = [];
    }
    grupo[dia].push(reserva);
    return grupo;
  }, {});

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="flex flex-col w-[60%]">
          {reservas.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-900">
              <FaList className="text-4xl mb-5" />
              <p className="text-lg font-medium">
                Nenhuma reserva por enquanto
              </p>
              <p className="text-sm">Crie a primeira reserva para começar</p>
            </div>
          ) : (
            <>
              {Object.entries(reservasPorDia).map(([dia, reservasDoDia]) => (
                <div key={dia}>
                  <h1 className="border-b border-gray-200 mb-2 p-2 capitalize">
                    {dia}
                  </h1>
                  {reservasDoDia.map((x) => (
                    <CardReserva
                      key={x.id}
                      titulo={x.titulo}
                      salaNome={x.salaNome}
                      horaInicio={x.horaInicio}
                      horaFim={x.horaFim}
                      onCancel={() => solicitarCancelamento(x)}
                    />
                  ))}
                </div>
              ))}

              <Paginacao
                paginaAtual={pagina}
                totalPaginas={totalPaginas}
                onPaginaAnterior={() => setPagina((p) => Math.max(1, p - 1))}
                onProximaPagina={() =>
                  setPagina((p) => Math.min(totalPaginas, p + 1))
                }
              />
            </>
          )}
        </div>
      </div>

      <ModalConfirmacao
        aberto={cancelamento !== null}
        titulo="Cancelar esta reserva?"
        mensagem={
          cancelamento
            ? `Título: ${cancelamento.titulo}\n
            Sala: ${cancelamento.salaNome}\n
            Data: ${new Date(cancelamento.horaInicio).toLocaleDateString("pt-BR")}\n
            Horário: ${new Date(cancelamento.horaInicio).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} - ${new Date(cancelamento.horaFim).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`
            : ""
        }
        onConfirm={confirmarCancelamento}
        onCancel={() => setCancelamento(null)}
      />
    </>
  );
}

export default ExibirReservas;
