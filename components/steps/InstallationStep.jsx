import React from "react";

const InstallationStep = ({ formData, handleChange, prevStep, nextStep }) => {
  return (
    <div className="step">
      <h3>Instalacja</h3>
      <div className="form-group">
        <label>Czy klient już posiada instalację?</label>
        <select
          name="czyPosiadaInstalacje"
          value={formData.czyPosiadaInstalacje}
          onChange={handleChange}
          required
        >
          <option value="">-- Wybierz --</option>
          <option value="tak">Tak</option>
          <option value="nie">Nie</option>
        </select>
      </div>
      <div className="form-group">
        <label>Miejsce instalacji</label>
        <select
          name="miejsceInstalacji"
          value={formData.miejsceInstalacji}
          onChange={handleChange}
        >
          <option value="">-- Wybierz --</option>
          <option value="Adres klienta">Adres klienta</option>
          <option value="Adres korespondencyjny">Adres korespondencyjny</option>
          <option value="Inny">Inny</option>
        </select>
      </div>
      <div className="sub-panel">
        <h4>Miejsce instalacji (szczegóły)</h4>
        <div className="form-group">
          <label>Ulica</label>
          <input
            type="text"
            name="miUlica"
            value={formData.miUlica}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Nr domu</label>
          <input
            type="text"
            name="miNrDomu"
            value={formData.miNrDomu}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Miejscowość</label>
          <input
            type="text"
            name="miMiejscowosc"
            value={formData.miMiejscowosc}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Kod pocztowy</label>
          <input
            type="text"
            name="miKod"
            value={formData.miKod}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Powiat</label>
          <input
            type="text"
            name="miPowiat"
            value={formData.miPowiat}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Województwo</label>
          <input
            type="text"
            name="miWojewodztwo"
            value={formData.miWojewodztwo}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Miejsce montażu instalacji</label>
        <select
          name="miejsceMontazu"
          value={formData.miejsceMontazu}
          onChange={handleChange}
        >
          <option value="">-- Wybierz --</option>
          <option value="Dach budynku mieszkalnego">
            Dach budynku mieszkalnego
          </option>
          <option value="Dach garażu">Dach garażu</option>
          <option value="Dach budynku gospodarczego">
            Dach budynku gospodarczego
          </option>
          <option value="Dach budynku rolnego">Dach budynku rolnego</option>
          <option value="Carport">Carport</option>
          <option value="Grunt">Grunt</option>
          <option value="Inne">Inne</option>
        </select>
      </div>
      <div className="form-group">
        <label>Instalacja fotowoltaiczna podzielona na ilość łańcuchów</label>
        <select
          name="lancuchy"
          value={formData.lancuchy}
          onChange={handleChange}
        >
          <option value="">-- Wybierz --</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="więcej">Więcej</option>
        </select>
      </div>
      <div className="form-group">
        <label>Lokalizacja licznika</label>
        <select
          name="licznikLokalizacja"
          value={formData.licznikLokalizacja}
          onChange={handleChange}
        >
          <option value="">-- Wybierz --</option>
          <option value="w budynku mieszkalnym w środku">
            w budynku mieszkalnym w środku
          </option>
          <option value="na zewnątrz">na zewnątrz</option>
          <option value="przed posesją">przed posesją</option>
          <option value="inne">inne</option>
        </select>
      </div>
      <div className="form-group">
        <label>Czy klient posiada zasięg internetu w miejscu montażu falownika?</label>
        <select
          name="zasiegInternetu"
          value={formData.zasiegInternetu}
          onChange={handleChange}
        >
          <option value="">-- Wybierz --</option>
          <option value="wifi">WiFi</option>
          <option value="ethernet">Ethernet</option>
          <option value="nie">Nie</option>
        </select>
      </div>
      <div className="form-group">
        <label>Czy w miejscu montażu falownika zasięg min. 2 kreski?</label>
        <select
          name="dwieKreski"
          value={formData.dwieKreski}
          onChange={handleChange}
        >
          <option value="">-- Wybierz --</option>
          <option value="tak">Tak</option>
          <option value="nie">Nie</option>
        </select>
      </div>
      <div className="form-group">
        <label>Czy klient posiada instalację odgromową?</label>
        <select
          name="odgromowa"
          value={formData.odgromowa}
          onChange={handleChange}
        >
          <option value="">-- Wybierz --</option>
          <option value="tak">Tak</option>
          <option value="nie">Nie</option>
        </select>
      </div>
      <div className="form-group">
        <label>Numer działki</label>
        <input
          type="text"
          name="numerDzialki"
          value={formData.numerDzialki}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Moc przyłączeniowa</label>
        <input
          type="text"
          name="mocPrzylaczeniowa"
          value={formData.mocPrzylaczeniowa}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Zabezpieczenie przedlicznikowe</label>
        <input
          type="text"
          name="zabezpieczenie"
          value={formData.zabezpieczenie}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Ilu fazowa instalacja?</label>
        <select name="fazowa" value={formData.fazowa} onChange={handleChange}>
          <option value="">-- Wybierz --</option>
          <option value="jednofazowa">Jednofazowa</option>
          <option value="trójfazowa">Trójfazowa</option>
        </select>
      </div>
      <div className="form-group">
        <label>Taryfa rozliczeniowa</label>
        <input
          type="text"
          name="taryfa"
          value={formData.taryfa}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Numer licznika</label>
        <input
          type="text"
          name="numerLicznika"
          value={formData.numerLicznika}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Numer PPM lub PPE</label>
        <input
          type="text"
          name="numerPpm"
          value={formData.numerPpm}
          onChange={handleChange}
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

export default InstallationStep;