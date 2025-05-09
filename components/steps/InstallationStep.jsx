import React from "react";

const InstallationStep = ({ formData, handleChange, prevStep, nextStep }) => {
  return (
    <div className="step">
      <h3>Instalacja</h3>
      <div className="form-group">
        <label>Czy posiada instalację</label>
        <input
          type="text"
          name="czyPosiadaInstalacje"
          value={formData.czyPosiadaInstalacje}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Miejsce instalacji (opcjonalne)</label>
        <input
          type="text"
          name="miejsceInstalacji"
          value={formData.miejsceInstalacji}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>MI Ulica (opcjonalne)</label>
        <input
          type="text"
          name="miUlica"
          value={formData.miUlica}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>MI Nr Domu (opcjonalne)</label>
        <input
          type="text"
          name="miNrDomu"
          value={formData.miNrDomu}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>MI Miejscowość (opcjonalne)</label>
        <input
          type="text"
          name="miMiejscowosc"
          value={formData.miMiejscowosc}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>MI Kod (opcjonalne)</label>
        <input
          type="text"
          name="miKod"
          value={formData.miKod}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>MI Powiat (opcjonalne)</label>
        <input
          type="text"
          name="miPowiat"
          value={formData.miPowiat}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>MI Województwo (opcjonalne)</label>
        <input
          type="text"
          name="miWojewodztwo"
          value={formData.miWojewodztwo}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Miejsce montażu (opcjonalne)</label>
        <input
          type="text"
          name="miejsceMontazu"
          value={formData.miejsceMontazu}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Łańcuchy (opcjonalne)</label>
        <input
          type="text"
          name="lancuchy"
          value={formData.lancuchy}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Licznik lokalizacja (opcjonalne)</label>
        <input
          type="text"
          name="licznikLokalizacja"
          value={formData.licznikLokalizacja}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Zasięg internetu (opcjonalne)</label>
        <input
          type="text"
          name="zasiegInternetu"
          value={formData.zasiegInternetu}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Dwie kreski (opcjonalne)</label>
        <input
          type="text"
          name="dwieKreski"
          value={formData.dwieKreski}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Odgromowa (opcjonalne)</label>
        <input
          type="text"
          name="odgromowa"
          value={formData.odgromowa}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Numer działki (opcjonalne)</label>
        <input
          type="text"
          name="numerDzialki"
          value={formData.numerDzialki}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Moc przyłączeniowa (opcjonalne)</label>
        <input
          type="text"
          name="mocPrzylaczeniowa"
          value={formData.mocPrzylaczeniowa}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Zabezpieczenie (opcjonalne)</label>
        <input
          type="text"
          name="zabezpieczenie"
          value={formData.zabezpieczenie}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Fazowa (opcjonalne)</label>
        <input
          type="text"
          name="fazowa"
          value={formData.fazowa}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Taryfa (opcjonalne)</label>
        <input
          type="text"
          name="taryfa"
          value={formData.taryfa}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Numer licznika (opcjonalne)</label>
        <input
          type="text"
          name="numerLicznika"
          value={formData.numerLicznika}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Numer PPM (opcjonalne)</label>
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