import React, { useState } from "react";

const Dokumenty = () => {
  const [showForm, setShowForm] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const handleAddDocumentClick = () => {
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (title.trim() && link.trim()) {
      setDocuments([...documents, { title, link }]);
      setTitle("");
      setLink("");
      setShowForm(false);
    }
  };

  return (
    <div className="biuro2-section">
      <h3>Dokumenty</h3>

      {documents.length === 0 && <p>Brak danych</p>}

      {documents.map((doc, index) => (
        <p key={index}>
          <a
            href={doc.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "black", textDecoration: "none" }}
          >
            {index + 1}. {doc.title}
          </a>
        </p>
      ))}

      {!showForm && (
        <button className="dodaj-faktury-button" onClick={handleAddDocumentClick}>
          Dodaj dokumenty
        </button>
      )}

      {showForm && (
        <div className="invoice-link-container">
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
          <button className="submit-link-button" onClick={handleSubmit}>
            Zapisz
          </button>
        </div>
      )}
    </div>
  );
};

export default Dokumenty;
