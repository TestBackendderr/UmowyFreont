import React, { useState } from "react";

const FinanceStep = ({
  formData,
  handleChange,
  handleProductChange,
  products,
  prevStep,
  nextStep,
}) => {
  // Local state to manage temporary product details for UI display
  const [productDetails, setProductDetails] = useState({});

  // Handle changes in product details (only for UI, not stored in formData)
  const handleDetailChange = (product, field, value) => {
    setProductDetails((prev) => ({
      ...prev,
      [product]: { ...prev[product], [field]: value },
    }));
  };

  return (
    <div className="step">
      <h3>Finanse</h3>
      <div className="form-group">
        <label>Numer umowy</label>
        <input
          type="text"
          name="numerUmowy"
          value={formData.numerUmowy}
          onChange={handleChange}
          required
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
      <div className="form-group">
        <label>Cena brutto</label>
        <input
          type="number"
          step="0.01"
          name="cenaBrutto"
          value={formData.cenaBrutto}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>1. wpłata (kwota brutto)</label>
        <input
          type="number"
          step="0.01"
          name="pierwszaWplata"
          value={formData.pierwszaWplata}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Sposób płatności 1</label>
        <select
          name="sposobPlatnosci1"
          value={formData.sposobPlatnosci1}
          onChange={handleChange}
          required
        >
          <option value="">-- Wybierz --</option>
          <option value="przelew">Przelew</option>
          <option value="kredyt">Kredyt</option>
          <option value="leasing">Leasing</option>
          <option value="gotowka">Gotówka</option>
          <option value="prefinans">Prefinans</option>
        </select>
      </div>
      <div className="form-group">
        <label>Brak 2. wpłaty, klient wpłaca wszystko w 1.?</label>
        <select
          name="czyJednaWplata"
          value={formData.czyJednaWplata}
          onChange={handleChange}
          required
        >
          <option value="">-- Wybierz --</option>
          <option value="tak">Tak</option>
          <option value="nie">Nie</option>
        </select>
      </div>
      {formData.czyJednaWplata === "nie" && (
        <>
          <div className="form-group">
            <label>2. wpłata (kwota brutto)</label>
            <input
              type="number"
              step="0.01"
              name="drugaWplata"
              value={formData.drugaWplata}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Sposób płatności 2. wpłaty</label>
            <select
              name="sposobPlatnosci2"
              value={formData.sposobPlatnosci2}
              onChange={handleChange}
            >
              <option value="">-- Wybierz --</option>
              <option value="przelew">Przelew</option>
              <option value="kredyt">Kredyt</option>
              <option value="leasing">Leasing</option>
              <option value="gotowka">Gotówka</option>
              <option value="prefinans">Prefinans</option>
            </select>
          </div>
        </>
      )}
      <div className="form-group">
        <label>Powierzchnia domu (m²)</label>
        <input
          type="number"
          name="powierzchniaDomu"
          value={formData.powierzchniaDomu}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Przedane produkty</label>
        <div className="products-selection">
          {products.map((product) => (
            <div key={product} className="product-item">
              <label className="product-checkbox">
                <input
                  type="checkbox"
                  checked={formData.przedaneProdukty.includes(product)}
                  onChange={() => handleProductChange(product)}
                />
                <span
                  className={`product-tag product-${product
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {product}
                </span>
              </label>
              {formData.przedaneProdukty.includes(product) && (
                <div className="product-details">
                  {product === "Fotowoltaika" && (
                    <select
                      value={productDetails[product]?.type || ""}
                      onChange={(e) =>
                        handleDetailChange(product, "type", e.target.value)
                      }
                    >
                      <option value="">-- Wybierz typ --</option>
                      <option value="Risen 420W (5,04 kWp)">
                        Risen 420W (5,04 kWp)
                      </option>
                      <option value="Risen 520W (5,04 kWp)">
                        Risen 520W (5,04 kWp)
                      </option>
                    </select>
                  )}
                  {product === "Magazyn Energii" && (
                    <select
                      value={productDetails[product]?.type || ""}
                      onChange={(e) =>
                        handleDetailChange(product, "type", e.target.value)
                      }
                    >
                      <option value="">-- Wybierz typ --</option>
                      <option value="Deye 5 kWh (10 kWh)">
                        Deye 5 kWh (10 kWh)
                      </option>
                    </select>
                  )}
                  {product === "Inne" && (
                    <input
                      type="text"
                      placeholder="Wpisz szczegóły"
                      value={productDetails[product]?.text || ""}
                      onChange={(e) =>
                        handleDetailChange(product, "text", e.target.value)
                      }
                    />
                  )}
                </div>
              )}
            </div>
          ))}
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

export default FinanceStep;