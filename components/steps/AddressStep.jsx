import React from "react";

const AddressStep = ({ formData, handleChange, prevStep, nextStep }) => {
  return (
    <div className="step">
      <h3>Adresy</h3>
      <div className="form-group">
        <label>Ulica</label>
        <input
          type="text"
          name="ulica"
          value={formData.ulica}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Miejscowość</label>
        <input
          type="text"
          name="miejscowosc"
          value={formData.miejscowosc}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Kod pocztowy</label>
        <input
          type="text"
          name="kodPocztowy"
          value={formData.kodPocztowy}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Powiat</label>
        <input
          type="text"
          name="powiat"
          value={formData.powiat}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Województwo</label>
        <input
          type="text"
          name="wojewodztwo"
          value={formData.wojewodztwo}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Adres Imię</label>
        <input
          type="text"
          name="adresImie"
          value={formData.adresImie}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Adres Ulica</label>
        <input
          type="text"
          name="adresUlica"
          value={formData.adresUlica}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Adres Nr Domu</label>
        <input
          type="text"
          name="adresNrDomu"
          value={formData.adresNrDomu}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Adres Miejscowość</label>
        <input
          type="text"
          name="adresMiejscowosc"
          value={formData.adresMiejscowosc}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Adres Kod Pocztowy</label>
        <input
          type="text"
          name="adresKodPocztowy"
          value={formData.adresKodPocztowy}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Adres Powiat</label>
        <input
          type="text"
          name="adresPowiat"
          value={formData.adresPowiat}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Adres Województwo</label>
        <input
          type="text"
          name="adresWojewodztwo"
          value={formData.adresWojewodztwo}
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
        <button type="button" className="action-button" onClick={nextStep}>
          Dalej
        </button>
      </div>
    </div>
  );
};

export default AddressStep;