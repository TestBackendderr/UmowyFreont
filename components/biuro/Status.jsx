import React, { useState } from "react";
import axios from "axios";

const statusLabels = {
  W_trakcie_realizacji: "W trakcie realizacji",
  Zakonczona: "Zakończona",
  Anulowana: "Anulowana",
  Oczekuje_na_potwierdzenie: "Oczekuje na potwierdzenie",
};

const reverseStatusLabels = Object.fromEntries(
  Object.entries(statusLabels).map(([key, value]) => [value, key])
);

const Status = ({ umowa }) => {
  const [status, setStatus] = useState(
    statusLabels[umowa.status] || "W trakcie realizacji"
  );
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    const enumValue = reverseStatusLabels[status];

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      await axios.patch(`${apiUrl}/umowa/${umowa.id}`, {
        status: enumValue,
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error("Błąd podczas aktualizacji statusu:", err);
      setError("Wystąpił błąd przy zapisie statusu.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="biuro2-section">
      <h3>Status</h3>
      <div className="status-container">
        <select
          value={status}
          onChange={handleStatusChange}
          className="status-dropdown"
        >
          {Object.values(statusLabels).map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
        <button
          onClick={handleSave}
          className="status-save-button"
          disabled={isSaving}
        >
          {isSaving ? "Zapisywanie..." : "Zapisz status"}
        </button>
        {success && <p className="success-message">Status zapisany!</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Status;
