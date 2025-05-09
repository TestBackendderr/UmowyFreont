import React from "react";

const PersonalDataStep = ({ formData, handleChange, nextStep }) => {
  return (
    <div className="step">
      <h3>Dane osobowe</h3>
      <div className="form-group">
        <label>Handlowiec</label>
        <input
          type="text"
          name="handlowiec"
          value={formData.handlowiec}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Imię i nazwisko</label>
        <input
          type="text"
          name="imieNazwisko"
          value={formData.imieNazwisko}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Telefon</label>
        <input
          type="text"
          name="telefon"
          value={formData.telefon}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>PESEL/NIP</label>
        <input
          type="text"
          name="peselNip"
          value={formData.peselNip}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Dowód</label>
        <input
          type="text"
          name="dowod"
          value={formData.dowod}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Telefon 2 (opcjonalny)</label>
        <input
          type="text"
          name="tel2"
          value={formData.tel2}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Telefon kontaktowy (opcjonalny)</label>
        <input
          type="text"
          name="kontaktowyTel"
          value={formData.kontaktowyTel}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Email (opcjonalny)</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="navigation">
        <button type="button" className="action-button" onClick={nextStep}>
          Dalej
        </button>
      </div>
    </div>
  );
};

export default PersonalDataStep;