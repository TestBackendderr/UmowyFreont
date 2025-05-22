import React from "react";

const PersonalDataStep = ({ formData, handleChange, nextStep }) => {
  const handleInputFilter = (e, pattern) => {
    const { name, value } = e.target;
    if (value === "" || pattern.test(value)) {
      handleChange(e);
    }
  };

  return (
    <div className="step">
      <h3>Dane osobowe</h3>
      <div className="form-group">
        <label>Handlowiec</label>
        <select
          name="handlowiec"
          value={formData.handlowiec}
          onChange={handleChange}
          required
        >
          <option value="">-- Wybierz --</option>
          <option value="Bartek Test">Bartek Test</option>
          <option value="Marcin Test">Marcin Test</option>
        </select>
      </div>
      <div className="form-group">
        <label>Data podpisania umowy</label>
        <input
          type="date"
          name="dataPodpisania"
          value={formData.dataPodpisania}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Numer umowy</label>
        <input
          type="text"
          name="numerUmowy"
          value={formData.numerUmowy}
          onChange={(e) => handleInputFilter(e, /^[A-Za-z0-9\- ]*$/)}
          required
        />
      </div>
      <div className="form-group">
        <label>Imię i nazwisko</label>
        <input
          type="text"
          name="imieNazwisko"
          value={formData.imieNazwisko}
          onChange={(e) => handleInputFilter(e, /^[A-Za-z\s\-]*$/)}
          required
        />
      </div>
      <div className="form-group">
        <label>Telefon</label>
        <input
          type="text"
          name="telefon"
          value={formData.telefon}
          onChange={(e) => handleInputFilter(e, /^\d*$/)}
          required
        />
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
        <label>PESEL/NIP</label>
        <input
          type="text"
          name="peselNip"
          value={formData.peselNip}
          onChange={(e) => handleInputFilter(e, /^\d*$/)}
          required
        />
      </div>
      <div className="form-group">
        <label>Dowód</label>
        <input
          type="text"
          name="dowod"
          value={formData.dowod}
          onChange={(e) => handleInputFilter(e, /^[A-Za-z0-9]*$/)}
          required
        />
      </div>
      <div className="form-group">
        <label>Telefon 2 (opcjonalny)</label>
        <input
          type="text"
          name="tel2"
          value={formData.tel2}
          onChange={(e) => handleInputFilter(e, /^\d*$/)}
        />
      </div>
      <div className="form-group">
        <label>Telefon kontaktowy (opcjonalny)</label>
        <input
          type="text"
          name="kontaktowyTel"
          value={formData.kontaktowyTel}
          onChange={(e) => handleInputFilter(e, /^\d*$/)}
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
      <div className="form-group">
        <label>Operator OSD</label>
        <select
          name="operatorOsd"
          value={formData.operatorOsd}
          onChange={handleChange}
          required
        >
          <option value="">-- Wybierz --</option>
          <option value="PGE Dystrybucja">PGE Dystrybucja</option>
          <option value="Tauron Dystrybucja">Tauron Dystrybucja</option>
          <option value="ENERGA Dystrybucja">ENERGA Dystrybucja</option>
          <option value="Enea Dystrybucja">Enea Dystrybucja</option>
          <option value="inny">Inny</option>
        </select>
      </div>
      <div className="form-group">
        <label>Czy właściciel instalacji jest właścicielem licznika?</label>
        <select
          name="czyWlascicielLicznika"
          value={formData.czyWlascicielLicznika}
          onChange={handleChange}
          required
        >
          <option value="">-- Wybierz --</option>
          <option value="tak">Tak</option>
          <option value="nie">Nie</option>
        </select>
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