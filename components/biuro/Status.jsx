import React, { useState } from "react";

const Status = () => {
  const [status, setStatus] = useState("W trakcie realizacji");

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSave = () => {
    console.log("Zapisany status:", status);
    // Здесь можно отправить статус на сервер или обновить глобальное состояние
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
          <option value="W trakcie realizacji">W trakcie realizacji</option>
          <option value="Zakończona">Zakończona</option>
          <option value="Anulowana">Anulowana</option>
          <option value="Oczekuje na potwierdzenie">Oczekuje na potwierdzenie</option>
        </select>
       
      </div>
    </div>
  );
};

export default Status;