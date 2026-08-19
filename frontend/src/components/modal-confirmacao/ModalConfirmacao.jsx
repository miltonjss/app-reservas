function ModalConfirmacao({ aberto, onConfirm, onCancel, titulo, mensagem }) {
  if (!aberto) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-100">
        <h2 className="text-lg font-semibold mb-2">{titulo}</h2>
        <p className="text-gray-700 mb-4 whitespace-pre-line">{mensagem}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmacao;
