function ModalActionAdd({ onClose, onConclude }) {
  return (
    <div className="d-flex justify-content-center py-4 px-4">
      <button
        type="button"
        className="btn w-100 me-1 modal-btn-cancel"
        onClick={onClose}
      >
        Cancelar
      </button>
      <button
        type="button"
        className="btn w-100 ms-1 modal-btn-ok"
        onClick={onConclude}
      >
        Adicionar
      </button>
    </div>
  );
}

function ModalActionEdit({ onClose, onDelete, onSave }) {
  return (
    <div className="d-flex justify-content-center py-4 px-4 mt-1">
      <button
        type="button"
        className="btn w-100 me-1 modal-btn-cancel"
        onClick={onClose}
      >
        Cancelar
      </button>
      <button
        type="button"
        className="btn w-100 modal-btn-delete"
        onClick={onDelete}
      >
        Deletar
      </button>
      <button
        type="button"
        className="btn w-100 ms-1 modal-btn-ok"
        onClick={onSave}
      >
        Salvar
      </button>
    </div>
  );
}

export { ModalActionAdd, ModalActionEdit };
