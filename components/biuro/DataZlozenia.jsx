import React, { useState } from "react";

const DataZlozenia = () => {
  const [showDateInput, setShowDateInput] = useState(false); 
  const [selectedType, setSelectedType] = useState(""); 
  const [osdDate, setOsdDate] = useState(""); 
  const [fundingDate, setFundingDate] = useState(""); 

  const handleAddDateClick = () => {
    setShowDateInput(true);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type); 
    setShowDateInput(false); 
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    if (selectedType === "OSD") {
      setOsdDate(date); 
    } else if (selectedType === "Dofinansowanie") {
      setFundingDate(date); 
    }
    setShowDateInput(false);
    setSelectedType(""); 
  };

  return (
    <div className="biuro2-section">
      <h3>Data Złożenia</h3>


      {!osdDate && !fundingDate && !showDateInput && (
        <button className="submit-link-button" onClick={handleAddDateClick}>
          Dodaj Date
        </button>
      )}

      {showDateInput && (
        <div>
          <button className="submit-link-button" onClick={() => handleTypeSelect("OSD")}>
            OSD
          </button>
          <button className="submit-link-button" onClick={() => handleTypeSelect("Dofinansowanie")}>
            Dofinansowanie
          </button>
        </div>
      )}

      {(selectedType === "OSD" || selectedType === "Dofinansowanie") && (
        <div>
          <input
            type="date"
            onChange={handleDateChange}
            className="date-input"
          />
        </div>
      )}
      {osdDate && (
        <p>
          Data złożenia wniosku OSD: {osdDate}
        </p>
      )}

      {fundingDate && (
        <p>
          Data złożenia wniosku o dofinansowanie: {fundingDate}
        </p>
      )}
    </div>
  );
};

export default DataZlozenia;
