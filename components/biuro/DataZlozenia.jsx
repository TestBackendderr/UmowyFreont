import React, { useState } from "react";

const DataZlozenia = () => {
  const [showOsdInput, setShowOsdInput] = useState(false);
  const [showFundingInput, setShowFundingInput] = useState(false);
  const [osdDate, setOsdDate] = useState("2025-05-10");
  const [fundingDate, setFundingDate] = useState("2025-05-15");

  const handleOsdButtonClick = () => {
    setShowOsdInput(true);
  };
  const handleFundingButtonClick = () => {
    setShowFundingInput(true);
  };
  const handleOsdDateChange = (e) => {
    setOsdDate(e.target.value);
    setShowOsdInput(false);
  };
  const handleFundingDateChange = (e) => {
    setFundingDate(e.target.value);
    setShowFundingInput(false);
  };

  return (
    <div className="biuro2-section">
      <h3>Data Złożenia</h3>
      <p>
        Data złożenia wniosku OSD: {osdDate}
        <button
          className="set-date-osd-button"
          onClick={handleOsdButtonClick}
        >
          Zmień
        </button>
      </p>
      {showOsdInput && (
        <input
          type="date"
          value={osdDate}
          onChange={handleOsdDateChange}
          className="date-input"
        />
      )}
      <p>
        Data złożenia wniosku o dofinansowanie: {fundingDate}
        <button
          className="set-date-funding-button"
          onClick={handleFundingButtonClick}
        >
          Zmień
        </button>
      </p>
      {showFundingInput && (
        <input
          type="date"
          value={fundingDate}
          onChange={handleFundingDateChange}
          className="date-input"
        />
      )}
    </div>
  );
};

export default DataZlozenia;