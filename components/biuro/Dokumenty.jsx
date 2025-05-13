import React, { useState } from "react";

const Dokumenty = () => {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [documentLink, setDocumentLink] = useState("");
  const handleAddDocumentClick = () => {
    setShowLinkInput(true);
  };
  const handleLinkChange = (e) => {
    setDocumentLink(e.target.value);
  };
  const handleLinkSubmit = () => {
    setShowLinkInput(false);
    setDocumentLink("");
  };

  return (
    <div className="biuro2-section">
      <h3>Dokumenty</h3>
      <p>1. Skan dokumentów</p>
      <p>2. Zdjęcia przed realizacją</p>
      <p>3. Zdjęcia po realizacji</p>
      <p>4. Protokół końcowy</p>
      <button
        className="dodaj-dokumenty-button"
        onClick={handleAddDocumentClick}
      >
        Dodaj dokumenty
      </button>
      {showLinkInput && (
        <div className="document-link-container">
          <input
            type="text"
            value={documentLink}
            onChange={handleLinkChange}
            placeholder="Wstaw link do Google Dysk"
            className="document-link-input"
          />
          <button
            className="submit-link-button"
            onClick={handleLinkSubmit}
          >
            Zapisz
          </button>
        </div>
      )}
    </div>
  );
};

export default Dokumenty;