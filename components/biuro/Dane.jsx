import React, { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Dane = ({ umowa, umowaId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    ulica: "",
    miejscowosc: "",
    kodPocztowy: "",
    powiat: "",
    wojewodztwo: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [displayedData, setDisplayedData] = useState({
    ulica: "",
    miejscowosc: "",
    kodPocztowy: "",
    powiat: "",
    wojewodztwo: "",
  });

  useEffect(() => {
    const adres = {
      ulica: "",
      miejscowosc: "",
      kodPocztowy: "",
      powiat: "",
      wojewodztwo: "",
    };

    switch (umowa.miejsceInstalacji) {
      case "Adres klienta":
        Object.assign(adres, {
          ulica: umowa.ulica,
          miejscowosc: umowa.miejscowosc,
          kodPocztowy: umowa.kodPocztowy,
          powiat: umowa.powiat,
          wojewodztwo: umowa.wojewodztwo,
        });
        break;
      case "Adres korespondencyjny":
        Object.assign(adres, {
          ulica: umowa.adresUlica,
          miejscowosc: umowa.adresMiejscowosc,
          kodPocztowy: umowa.adresKodPocztowy,
          powiat: umowa.adresPowiat,
          wojewodztwo: umowa.adresWojewodztwo,
        });
        break;
      case "Inny":
        Object.assign(adres, {
          ulica: umowa.miUlica,
          miejscowosc: umowa.miMiejscowosc,
          kodPocztowy: umowa.miKod,
          powiat: umowa.miPowiat,
          wojewodztwo: umowa.miWojewodztwo,
        });
        break;
      default:
        break;
    }

    setFormData(adres);
    setDisplayedData(adres);
  }, [umowa]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const updateData = {};
      switch (umowa.miejsceInstalacji) {
        case "Adres klienta":
          Object.assign(updateData, {
            ulica: formData.ulica,
            miejscowosc: formData.miejscowosc,
            kodPocztowy: formData.kodPocztowy,
            powiat: formData.powiat,
            wojewodztwo: formData.wojewodztwo,
          });
          break;
        case "Adres korespondencyjny":
          Object.assign(updateData, {
            adresUlica: formData.ulica,
            adresMiejscowosc: formData.miejscowosc,
            adresKodPocztowy: formData.kodPocztowy,
            adresPowiat: formData.powiat,
            adresWojewodztwo: formData.wojewodztwo,
          });
          break;
        case "Inny":
          Object.assign(updateData, {
            miUlica: formData.ulica,
            miMiejscowosc: formData.miejscowosc,
            miKod: formData.kodPocztowy,
            miPowiat: formData.powiat,
            miWojewodztwo: formData.wojewodztwo,
          });
          break;
        default:
          throw new Error("Brak miejsca instalacji.");
      }

      await axios.patch(`${apiUrl}/umowa/${umowaId}`, updateData);
      setSuccess("Dane zaktualizowane!");
      setDisplayedData(formData);
      setIsEditing(false);
    } catch (err) {
      setError(
        err.response?.data?.message?.join(", ") || "Błąd aktualizacji danych."
      );
      console.error(err);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError(null);
    setSuccess(null);
    const resetAdres = {
      ulica: "",
      miejscowosc: "",
      kodPocztowy: "",
      powiat: "",
      wojewodztwo: "",
    };

    switch (umowa.miejsceInstalacji) {
      case "Adres klienta":
        Object.assign(resetAdres, {
          ulica: umowa.ulica,
          miejscowosc: umowa.miejscowosc,
          kodPocztowy: umowa.kodPocztowy,
          powiat: umowa.powiat,
          wojewodztwo: umowa.wojewodztwo,
        });
        break;
      case "Adres korespondencyjny":
        Object.assign(resetAdres, {
          ulica: umowa.adresUlica,
          miejscowosc: umowa.adresMiejscowosc,
          kodPocztowy: umowa.adresKodPocztowy,
          powiat: umowa.adresPowiat,
          wojewodztwo: umowa.adresWojewodztwo,
        });
        break;
      case "Inny":
        Object.assign(resetAdres, {
          ulica: umowa.miUlica,
          miejscowosc: umowa.miMiejscowosc,
          kodPocztowy: umowa.miKod,
          powiat: umowa.miPowiat,
          wojewodztwo: umowa.miWojewodztwo,
        });
        break;
      default:
        break;
    }

    setFormData(resetAdres);
    setDisplayedData(resetAdres);
  };

  const renderAddress = () => {
    if (
      !displayedData.ulica &&
      !displayedData.miejscowosc &&
      !displayedData.kodPocztowy
    ) {
      return <p>Brak danych.</p>;
    }

    return (
      <>
        <p>Ulica: {displayedData.ulica}</p>
        <p>
          Kod pocztowy: {displayedData.kodPocztowy} {displayedData.miejscowosc}
        </p>
        <p>Powiat: {displayedData.powiat}</p>
        <p>Województwo: {displayedData.wojewodztwo}</p>
      </>
    );
  };

  return (
    <div className="biuro2-section">
      <p>Klient: {umowa.imieNazwisko || "Brak danych"}</p>
      <p>Telefon: {umowa.telefon || "Brak danych"}</p>

      <h3 style={{ marginTop: "20px" }}>Adres instalacji</h3>

      {!isEditing ? (
        <>
          {renderAddress()}
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              className="submit-link-button"
              onClick={() => setIsEditing(true)}
            >
              Edytuj
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleSave}>
          <div style={{ marginBottom: "8px" }}>
            <label>
              Ulica:
              <br />
              <input
                type="text"
                name="ulica"
                value={formData.ulica}
                onChange={handleInputChange}
                className="text-input"
                placeholder="Ulica"
                required
              />
            </label>
          </div>
          <div style={{ marginBottom: "8px" }}>
            <label>
              Miejscowość:
              <br />
              <input
                type="text"
                name="miejscowosc"
                value={formData.miejscowosc}
                onChange={handleInputChange}
                className="text-input"
                placeholder="Miejscowość"
                required
              />
            </label>
          </div>
          <div style={{ marginBottom: "8px" }}>
            <label>
              Kod pocztowy:
              <br />
              <input
                type="text"
                name="kodPocztowy"
                value={formData.kodPocztowy}
                onChange={handleInputChange}
                className="text-input"
                placeholder="Kod pocztowy"
                required
              />
            </label>
          </div>
          <div style={{ marginBottom: "8px" }}>
            <label>
              Powiat:
              <br />
              <input
                type="text"
                name="powiat"
                value={formData.powiat}
                onChange={handleInputChange}
                className="text-input"
                placeholder="Powiat"
                required
              />
            </label>
          </div>
          <div style={{ marginBottom: "8px" }}>
            <label>
              Województwo:
              <br />
              <input
                type="text"
                name="wojewodztwo"
                value={formData.wojewodztwo}
                onChange={handleInputChange}
                className="text-input"
                placeholder="Województwo"
                required
              />
            </label>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" className="submit-link-button">
              Zapisz
            </button>
            <button
              type="button"
              className="cancel-link-button"
              onClick={handleCancel}
            >
              Anuluj
            </button>
          </div>
        </form>
      )}

      {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
      {success && <p style={{ color: "green", marginTop: "8px" }}>{success}</p>}
    </div>
  );
};

export default Dane;
