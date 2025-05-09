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
        <label>Czy został zamontowany baner w miejscu montażu?</label>
        <select
          name="banerZamontowany"
          value={formData.banerZamontowany}
          onChange={handleChange}
        >
          <option value="">-- Wybierz --</option>
          <option value="tak">Tak</option>
          <option value="nie">Nie</option>
        </select>
      </div>
      <div className="form-group">
        <label>Handlowiec do wynagrodzenia (opcjonalne)</label>
        <select
          name="handlowiecWynagrodzenie"
          value={formData.handlowiecWynagrodzenie}
          onChange={handleChange}
        >
          <option value="">-- Wybierz --</option>
          <option value="Bartek Test">Bartek Test</option>
          <option value="Marcin Test">Marcin Test</option>
        </select>
      </div>
      <div className="form-group">
        <label>Rodzaj klienta</label>
        <select
          name="rodzajKlienta"
          value={formData.rodzajKlienta}
          onChange={handleChange}
          required
        >
          <option value="">-- Wybierz --</option>
          <option value="Osoba fizyczna">Osoba fizyczna</option>
          <option value="Działalność gospodarcza">Działalność gospodarcza</option>
        </select>
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