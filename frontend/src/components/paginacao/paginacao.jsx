function Paginacao({
  paginaAtual,
  totalPaginas,
  onPaginaAnterior,
  onProximaPagina,
}) {
  if (totalPaginas <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-4 mb-8">
      <button
        onClick={onPaginaAnterior}
        disabled={paginaAtual === 1}
        className="px-3 py-1 rounded border border-gray-300 disabled:opacity-40"
      >
        Anterior
      </button>
      <span className="px-3 py-1">
        Página {paginaAtual} de {totalPaginas}
      </span>
      <button
        onClick={onProximaPagina}
        disabled={paginaAtual === totalPaginas}
        className="px-3 py-1 rounded border border-gray-300 disabled:opacity-40"
      >
        Próxima
      </button>
    </div>
  );
}

export default Paginacao;
