import React, { useState, useEffect } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Dokumenty = ({ umowaId }) => {
  const [showForm, setShowForm] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editLink, setEditLink] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${apiUrl}/documents/umowa/${umowaId}`);
        if (!response.ok) {
          throw new Error("Nie udało się pobrać dokumentów");
        }
        const data = await response.json();
        setDocuments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (umowaId) {
      fetchDocuments();
    }
  }, [umowaId]);

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

  const handleSubmit = async () => {
    if (!title.trim() || !link.trim()) {
      setError("Tytuł i link są wymagane");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiUrl}/documents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, link, umowaId }),
      });

      if (!response.ok) {
        throw new Error("Nie udało się dodać dokumentu");
      }

      const newDocument = await response.json();
      setDocuments([...documents, newDocument]);
      setTitle("");
      setLink("");
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (document) => {
    setEditId(document.id);
    setEditTitle(document.title);
    setEditLink(document.link);
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditTitle("");
    setEditLink("");
  };

  const handleEditSave = async () => {
    if (!editTitle.trim() || !editLink.trim()) {
      setError("Tytuł i link są wymagane");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiUrl}/documents/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle, link: editLink, umowaId }),
      });

      if (!response.ok) {
        throw new Error("Nie udało się edytować dokumentu");
      }

      const updatedDocument = await response.json();
      setDocuments(
        documents.map((doc) => (doc.id === editId ? updatedDocument : doc))
      );
      setEditId(null);
      setEditTitle("");
      setEditLink("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiUrl}/documents/${confirmDeleteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Nie udało się usunąć dokumentu");
      }

      setDocuments(documents.filter((doc) => doc.id !== confirmDeleteId));
      setConfirmDeleteId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
  };

  return (
    <div className="biuro2-section">
      <h3>Dokumenty</h3>

      {loading && <p>Ładowanie...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {documents.length === 0 && !loading && <p>Brak danych.</p>}

      {documents.map((doc) => (
        <div key={doc.id} style={{ marginBottom: "6px" }}>
          {editId === doc.id ? (
            <div className="invoice-link-container">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Nazwa dokumentu"
                className="invoice-link-input"
                disabled={loading}
              />
              <input
                type="text"
                value={editLink}
                onChange={(e) => setEditLink(e.target.value)}
                placeholder="Link do dokumentu"
                className="invoice-link-input"
                disabled={loading}
              />
              <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                <button
                  className="submit-link-button"
                  onClick={handleEditSave}
                  disabled={loading}
                >
                  Zapisz
                </button>
                <button
                  className="cancel-link-button"
                  onClick={handleEditCancel}
                  disabled={loading}
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
                {documents.indexOf(doc) + 1}. {doc.title}
              </a>
              <button
                onClick={() => startEdit(doc)}
                className="submit-link-button"
                style={{ marginLeft: "8px" }}
                disabled={loading}
              >
                Edytuj
              </button>
              <button
                onClick={() => handleDelete(doc.id)}
                className="cancel-link-button"
                style={{ marginLeft: "8px" }}
                disabled={loading}
              >
                Usuń
              </button>
            </div>
          )}
        </div>
      ))}

      {!showForm && editId === null && (
        <button
          className="dodaj-faktury-button"
          onClick={handleAddDocumentClick}
          disabled={loading}
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
            disabled={loading}
          />
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Link do dokumentu"
            className="invoice-link-input"
            disabled={loading}
          />
          <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
            <button
              className="submit-link-button"
              onClick={handleSubmit}
              disabled={loading}
            >
              Zapisz
            </button>
            <button
              className="cancel-link-button"
              onClick={handleCancel}
              disabled={loading}
            >
              Anuluj
            </button>
          </div>
        </div>
      )}

      {confirmDeleteId !== null && (
        <div className="confirmation-modal">
          <p>
            Usunąć:{" "}
            <strong>
              {documents.find((doc) => doc.id === confirmDeleteId)?.title}
            </strong>
            ?
          </p>
          <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
            <button
              className="submit-link-button"
              onClick={handleConfirmDelete}
              disabled={loading}
            >
              Tak, usuń
            </button>
            <button
              className="cancel-link-button"
              onClick={handleCancelDelete}
              disabled={loading}
            >
              Anuluj
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dokumenty;
