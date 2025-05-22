import React, { useEffect, useCallback, useState } from "react";
import { debounce } from "lodash";

const AddressStep = ({ formData, handleChange, prevStep, nextStep }) => {
  const [postcodesData, setPostcodesData] = useState([]);
  const [lastProcessedClientPostalCode, setLastProcessedClientPostalCode] =
    useState(null);
  const [
    lastProcessedCorrespondencePostalCode,
    setLastProcessedCorrespondencePostalCode,
  ] = useState(null);

  useEffect(() => {
    fetch("/kody_pocztowe.json")
      .then((response) => response.json())
      .then((data) => setPostcodesData(data))
      .catch((error) => console.error("Error loading postcodes JSON:", error));
  }, []);

  const cleanAndCapitalize = (value = "", prefixToRemove = "") => {
    let cleaned = value
      .toLowerCase()
      .replace(new RegExp(`^(${prefixToRemove}|miasto)\\s+`, "i"), "")
      .trim();
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  };

  const resetFields = (fieldPrefix) => {
    const resetUpdates = [
      {
        name: fieldPrefix === "client" ? "wojewodztwo" : "adresWojewodztwo",
        value: "",
      },
      {
        name: fieldPrefix === "client" ? "powiat" : "adresPowiat",
        value: "",
      },
    ];
    resetUpdates.forEach(({ name, value }) => {
      handleChange({
        target: { name, value },
      });
    });
  };

  const fetchFromApi = async (postalCode, fieldPrefix) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?postalcode=${postalCode}&country=Poland&format=json&addressdetails=1&accept-language=pl`
      );
      const data = await response.json();
      if (data.length > 0 && data[0].address) {
        const { county, state } = data[0].address;

        const region = state ? cleanAndCapitalize(state, "województwo") : "";
        const district = county ? cleanAndCapitalize(county, "powiat") : "";

        const updates = [
          {
            name: fieldPrefix === "client" ? "wojewodztwo" : "adresWojewodztwo",
            value: region,
          },
          {
            name: fieldPrefix === "client" ? "powiat" : "adresPowiat",
            value: district,
          },
        ];

        updates.forEach(({ name, value }) => {
          handleChange({
            target: { name, value },
          });
        });
      } else {
        resetFields(fieldPrefix);
      }
    } catch (error) {
      console.error("Error fetching from API:", error);
      resetFields(fieldPrefix);
    }
  };

  const fetchAddressDetails = useCallback(
    (postalCode, fieldPrefix) => {
      const lastProcessedPostalCode =
        fieldPrefix === "client"
          ? lastProcessedClientPostalCode
          : lastProcessedCorrespondencePostalCode;
      const setLastProcessed =
        fieldPrefix === "client"
          ? setLastProcessedClientPostalCode
          : setLastProcessedCorrespondencePostalCode;

      if (!postalCode || !/^\d{2}-\d{3}$/.test(postalCode)) {
        resetFields(fieldPrefix);
        setLastProcessed(null);
        return;
      }

      if (postalCode === lastProcessedPostalCode) {
        return;
      }

      const addressData = postcodesData.find(
        (entry) => entry.postcode === postalCode
      );

      if (addressData) {
        let { region, district } = addressData;

        region = region ? cleanAndCapitalize(region, "województwo") : "";
        district = district ? cleanAndCapitalize(district, "powiat") : "";

        const updates = [
          {
            name: fieldPrefix === "client" ? "wojewodztwo" : "adresWojewodztwo",
            value: region,
          },
          {
            name: fieldPrefix === "client" ? "powiat" : "adresPowiat",
            value: district,
          },
        ];

        updates.forEach(({ name, value }) => {
          handleChange({
            target: { name, value },
          });
        });
        setLastProcessed(postalCode);
      } else {
        setLastProcessed(postalCode);
        fetchFromApi(postalCode, fieldPrefix);
      }
    },
    [
      postcodesData,
      handleChange,
      lastProcessedClientPostalCode,
      lastProcessedCorrespondencePostalCode,
    ]
  );

  const debouncedFetchAddressDetails = useCallback(
    debounce(fetchAddressDetails, 500),
    [fetchAddressDetails]
  );

  const handleClientPostalCodeChange = (e) => {
    handleChange(e);
    debouncedFetchAddressDetails(e.target.value, "client");
  };

  const handleCorrespondencePostalCodeChange = (e) => {
    handleChange(e);
    debouncedFetchAddressDetails(e.target.value, "correspondence");
  };

  return (
    <div className="step">
      <h3>Adresy</h3>
      <div className="sub-panel">
        <h4>Adres klienta</h4>
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
            onChange={handleClientPostalCodeChange}
            required
            pattern="\d{2}-\d{3}"
            placeholder="e.g., 12-345"
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
      </div>
      <div className="sub-panel">
        <h4>Adres korespondencyjny</h4>
        <div className="form-group">
          <label>Imię nazwisko / Dane firmy</label>
          <input
            type="text"
            સ
            name="adresImie"
            value={formData.adresImie}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Ulica</label>
          <input
            type="text"
            name="adresUlica"
            value={formData.adresUlica}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Nr domu</label>
          <input
            type="text"
            name="adresNrDomu"
            value={formData.adresNrDomu}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Miejscowość</label>
          <input
            type="text"
            name="adresMiejscowosc"
            value={formData.adresMiejscowosc}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Kod pocztowy</label>
          <input
            type="text"
            name="adresKodPocztowy"
            value={formData.adresKodPocztowy}
            onChange={handleCorrespondencePostalCodeChange}
            required
            pattern="\d{2}-\d{3}"
            placeholder="e.g., 12-345"
          />
        </div>
        <div className="form-group">
          <label>Powiat</label>
          <input
            type="text"
            name="adresPowiat"
            value={formData.adresPowiat}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Województwo</label>
          <input
            type="text"
            name="adresWojewodztwo"
            value={formData.adresWojewodztwo}
            onChange={handleChange}
            required
          />
        </div>
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
