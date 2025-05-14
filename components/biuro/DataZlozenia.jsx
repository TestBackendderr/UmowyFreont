import React, { useState } from "react";

const DataZlozenia = () => {
  const [showDateInput, setShowDateInput] = useState(false);
  const [showEditOptions, setShowEditOptions] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [osdDate, setOsdDate] = useState("");
  const [fundingDate, setFundingDate] = useState("");

  const handleAddDateClick = () => {
    setShowDateInput(true);
    setShowEditOptions(false);
  };

  const handleEditClick = () => {
    setShowEditOptions(true);
    setShowDateInput(false);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setShowDateInput(false);
    setShowEditOptions(false);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    if (selectedType === "OSD") {
      setOsdDate(date);
    } else if (selectedType === "Dofinansowanie") {
      setFundingDate(date);
    }
    setSelectedType("");
  };

  const handleCancel = () => {
    setShowDateInput(false);
    setShowEditOptions(false);
    setSelectedType("");
  };

  return (
    <div className="biuro2-section">
      <h3>Data Złożenia</h3>

      {!osdDate && !fundingDate && <p>Brak danych.</p>}

      {(selectedType === "OSD" || selectedType === "Dofinansowanie") && (
        <div style={{ marginTop: "8px" }}>
          <input
            type="date"
            value={selectedType === "OSD" ? osdDate : fundingDate}
            onChange={handleDateChange}
            className="date-input"
          />
          <button
            className="cancel-link-button"
            onClick={handleCancel}
            style={{ marginLeft: "8px" }}
          >
            Anuluj
          </button>
        </div>
      )}

      {osdDate && <p>Data złożenia wniosku OSD: {osdDate}</p>}
      {fundingDate && (
        <p>Data złożenia wniosku o dofinansowanie: {fundingDate}</p>
      )}

      {!showDateInput && !showEditOptions && !selectedType && (
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          {(!osdDate || !fundingDate) && (
            <button className="submit-link-button" onClick={handleAddDateClick}>
              Dodaj Date
            </button>
          )}
          {(osdDate || fundingDate) && (
            <button className="submit-link-button" onClick={handleEditClick}>
              Edytuj
            </button>
          )}
        </div>
      )}

      {showDateInput && (
        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
          {!osdDate && (
            <button
              className="submit-link-button"
              onClick={() => handleTypeSelect("OSD")}
            >
              OSD
            </button>
          )}
          {!fundingDate && (
            <button
              className="submit-link-button"
              onClick={() => handleTypeSelect("Dofinansowanie")}
            >
              Dofinansowanie
            </button>
          )}
          <button className="cancel-link-button" onClick={handleCancel}>
            Anuluj
          </button>
        </div>
      )}

      {showEditOptions && (
        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
          {osdDate && (
            <button
              className="submit-link-button"
              onClick={() => handleTypeSelect("OSD")}
            >
              OSD
            </button>
          )}
          {fundingDate && (
            <button
              className="submit-link-button"
              onClick={() => handleTypeSelect("Dofinansowanie")}
            >
              Dofinansowanie
            </button>
          )}
          <button className="cancel-link-button" onClick={handleCancel}>
            Anuluj
          </button>
        </div>
      )}
    </div>
  );
};

export default DataZlozenia;
