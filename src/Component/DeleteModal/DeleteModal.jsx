import React from "react";

const deleteModal = ({ setShowDeleteModal, handleDelete, bookTitle }) => {
  return (
    <div className="modal-wrapperr">
      <div className="modall">
        <h5>{bookTitle} Kitabını Silmek İstiyor Musunuz?</h5>
        <button
          onClick={() => setShowDeleteModal(false)}
          className="btn btn-warning"
        >
          Vazgeç
        </button>
        <button onClick={() => handleDelete()} className="btn btn-danger">
          Onayla
        </button>
      </div>
    </div>
  );
};

export default deleteModal;
