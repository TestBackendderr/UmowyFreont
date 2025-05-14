import React, { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const DataZlozenia = ({ umowaId }) => {
  const [showDateInput, setShowDateInput] = useState(false);
  const [showEditOptions, setShowEditOptions] = useState(false);
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [osdDate, setOsdDate] = useState("");
  const [fundingDate, setFundingDate] = useState("");
  const [submissionDateId, setSubmissionDateId] = useState(null);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const res = await axios.get(
          `${apiUrl}/submission-dates/umowa/${umowaId}`
        );
        const data = res.data?.[0];
        if (data) {
          setSubmissionDateId(data.id);
          setOsdDate(data.osdDate?.substring(0, 10) || "");
          setFundingDate(data.fundingDate?.substring(0, 10) || "");
        }
      } catch (err) {
        console.error("Błąd ładowania dat:", err);
      }
    };

    if (umowaId) fetchDates();
  }, [umowaId]);

  const handleAddDateClick = () => {
    setShowDateInput(true);
    setShowEditOptions(false);
    setShowDeleteOptions(false);
  };

  const handleEditClick = () => {
    setShowEditOptions(true);
    setShowDateInput(false);
    setShowDeleteOptions(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteOptions(true);
    setShowEditOptions(false);
    setShowDateInput(false);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setShowDateInput(false);
    setShowEditOptions(false);
    setShowDeleteOptions(false);
  };

  const saveDate = async (date, type) => {
    const isoDate = new Date(date).toISOString();

    const payload = {
      umowaId,
      osdDate: type === "OSD" ? isoDate : undefined,
      fundingDate: type === "Dofinansowanie" ? isoDate : undefined,
    };

    try {
      if (submissionDateId) {
        await axios.put(
          `${apiUrl}/submission-dates/${submissionDateId}`,
          payload
        );
      } else {
        const res = await axios.post(`${apiUrl}/submission-dates`, payload);
        setSubmissionDateId(res.data.id);
      }

      if (type === "OSD") setOsdDate(date);
      if (type === "Dofinansowanie") setFundingDate(date);
    } catch (err) {
      console.error("Błąd zapisu daty:", err);
    }

    setSelectedType("");
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    if (selectedType === "OSD" || selectedType === "Dofinansowanie") {
      saveDate(date, selectedType);
    }
  };

  const handleDeleteConfirmed = async (type) => {
    const payload = {
      umowaId,
      osdDate:
        type === "OSD"
          ? null
          : osdDate
          ? new Date(osdDate).toISOString()
          : undefined,
      fundingDate:
        type === "Dofinansowanie"
          ? null
          : fundingDate
          ? new Date(fundingDate).toISOString()
          : undefined,
    };

    try {
      if (submissionDateId) {
        await axios.put(
          `${apiUrl}/submission-dates/${submissionDateId}`,
          payload
        );
      }

      if (type === "OSD") setOsdDate("");
      if (type === "Dofinansowanie") setFundingDate("");
    } catch (err) {
      console.error("Błąd usuwania daty:", err);
    }

    setShowDeleteOptions(false);
  };

  const handleCancel = () => {
    setShowDateInput(false);
    setShowEditOptions(false);
    setShowDeleteOptions(false);
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

      {!showDateInput &&
        !showEditOptions &&
        !showDeleteOptions &&
        !selectedType && (
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            {(!osdDate || !fundingDate) && (
              <button
                className="submit-link-button"
                onClick={handleAddDateClick}
              >
                Dodaj Datę
              </button>
            )}
            {(osdDate || fundingDate) && (
              <>
                <button
                  className="submit-link-button"
                  onClick={handleEditClick}
                >
                  Edytuj
                </button>
                <button
                  className="cancel-link-button"
                  onClick={handleDeleteClick}
                >
                  Usuń
                </button>
              </>
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

      {showDeleteOptions && (
        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
          {osdDate && (
            <button
              className="submit-link-button"
              style={{ backgroundColor: "#dc3545", color: "white" }}
              onClick={() => handleDeleteConfirmed("OSD")}
            >
              Usuń OSD
            </button>
          )}
          {fundingDate && (
            <button
              className="submit-link-button"
              style={{ backgroundColor: "#dc3545", color: "white" }}
              onClick={() => handleDeleteConfirmed("Dofinansowanie")}
            >
              Usuń Dofinansowanie
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
