import React from "react";

const AdditionalInfoStep = ({
  formData,
  handleChange,
  prevStep,
  handleSubmit,
}) => {
  return (
    <div className="step">
      <h3>Dodatkowe informacje</h3>
      <div className="form-group">
        <label>Uwagi handlowca (opcjonalne)</label>
        <textarea
          name="uwagiHandlowca"
          value={formData.uwagiHandlowca}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Baner zamontowany (opcjonalne)</label>
        <input
          type="text"
          name="banerZamontowany"
          value={formData.banerZamontowany}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Wynagrodzenie handlowca (opcjonalne)</label>
        <input
          type="number"
          step="0.01"
          name="handlowiecWynagrodzenie"
          value={formData.handlowiecWynagrodzenie}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Rodzaj klienta</label>
        <input
          type="text"
          name="rodzajKlienta"
          value={formData.rodzajKlienta}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Data podpisania</label>
        <input
          type="date"
          name="dataPodpisania"
          value={formData.dataPodpisania}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Opis umowy BOK</label>
        <textarea
          name="opisUmowyBOK"
          value={formData.opisUmowyBOK}
          onChange={handleChange}
          required
        />
      </div>
      <div className="navigation">
        <button
          type="button"
          className="action-button secondary"
          onClick={prevStep}
        >
          Wstecz
        </button>
        <button type="button" className="action-button" onClick={handleSubmit}>
          Zakończ
        </button>
      </div>
    </div>
  );
};

export default AdditionalInfoStep;