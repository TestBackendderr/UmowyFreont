import React, { useState } from "react";

const Dokumenty = () => {
  const [showForm, setShowForm] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editLink, setEditLink] = useState("");

  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

  const handleAddDocumentClick = () => {
    setShowForm(true);
    setTitle("");
    setLink("");
  };

  const handleCancel = () => {
    setShowForm(false);
    setTitle("");
    setLink("");
  };

  const handleSubmit = () => {
    if (title.trim() && link.trim()) {
      setDocuments([...documents, { title, link }]);
      setTitle("");
      setLink("");
      setShowForm(false);
    }
  };

  const handleDelete = (index) => {
    setConfirmDeleteIndex(index);
  };

  const handleConfirmDelete = () => {
    const updatedDocs = documents.filter((_, i) => i !== confirmDeleteIndex);
    setDocuments(updatedDocs);
    setConfirmDeleteIndex(null);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteIndex(null);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditTitle(documents[index].title);
    setEditLink(documents[index].link);
  };

  const handleEditCancel = () => {
    setEditIndex(null);
    setEditTitle("");
    setEditLink("");
  };

  const handleEditSave = () => {
    if (editTitle.trim() && editLink.trim()) {
      const updatedDocs = [...documents];
      updatedDocs[editIndex] = { title: editTitle, link: editLink };
      setDocuments(updatedDocs);
      setEditIndex(null);
      setEditTitle("");
      setEditLink("");
    }
  };

  return (
    <div className="biuro2-section">
      <h3>Dokumenty</h3>

      {documents.length === 0 && <p>Brak danych.</p>}

      {documents.map((doc, index) => (
        <div key={index} style={{ marginBottom: "6px" }}>
          {editIndex === index ? (
            <div className="invoice-link-container">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Nazwa dokumentu"
                className="invoice-link-input"
              />
              <input
                type="text"
                value={editLink}
                onChange={(e) => setEditLink(e.target.value)}
                placeholder="Link do dokumentu"
                className="invoice-link-input"
              />
              <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                <button className="submit-link-button" onClick={handleEditSave}>
                  Zapisz
                </button>
                <button
                  className="cancel-link-button"
                  onClick={handleEditCancel}
                >
                  Anuluj
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <a
                href={doc.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "black", textDecoration: "none", flexGrow: 1 }}
              >
                {index + 1}. {doc.title}
              </a>
              <button
                onClick={() => startEdit(index)}
                className="submit-link-button"
                style={{ marginLeft: "8px" }}
              >
                Edytuj
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="cancel-link-button"
                style={{ marginLeft: "8px" }}
              >
                Usuń
              </button>
            </div>
          )}
        </div>
      ))}

      {!showForm && editIndex === null && (
        <button
          className="dodaj-faktury-button"
          onClick={handleAddDocumentClick}
        >
          Dodaj dokumenty
        </button>
      )}

      {showForm && (
        <div className="invoice-link-container" style={{ marginTop: "10px" }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nazwa dokumentu"
            className="invoice-link-input"
          />
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Link do dokumentu"
            className="invoice-link-input"
          />
          <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
            <button className="submit-link-button" onClick={handleSubmit}>
              Zapisz
            </button>
            <button className="cancel-link-button" onClick={handleCancel}>
              Anuluj
            </button>
          </div>
        </div>
      )}

      {confirmDeleteIndex !== null && (
        <div className="confirmation-modal">
          <p>
            Usunąć: <strong>{documents[confirmDeleteIndex].title}</strong>?
          </p>
          <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
            <button
              className="submit-link-button"
              onClick={handleConfirmDelete}
            >
              Tak, usuń
            </button>
            <button className="cancel-link-button" onClick={handleCancelDelete}>
              Anuluj
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dokumenty;
