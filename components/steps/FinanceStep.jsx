import React, { useState, useEffect } from "react";

const FinanceStep = ({
  formData,
  handleChange,
  handleProductChange,
  products,
  prevStep,
  nextStep,
}) => {
  const [productDetails, setProductDetails] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const initialDetails = formData.przedaneProdukty.reduce((acc, product) => {
      acc[product.name] = product.details || {};
      return acc;
    }, {});
    setProductDetails(initialDetails);
  }, [formData.przedaneProdukty]);

  const handleDetailChange = (product, field, value) => {
    setProductDetails((prev) => ({
      ...prev,
      [product]: { ...prev[product], [field]: value },
    }));

    handleProductChange(
      product,
      {
        ...(productDetails[product] || {}),
        [field]: value,
      },
      false
    );
  };

  const onProductChange = (product) => {
    const details = productDetails[product] || {};
    handleProductChange(product, details, true);
  };

  const validateProducts = () => {
    const newErrors = {};
    formData.przedaneProdukty.forEach((product) => {
      if (
        product.name === "Fotowoltaika" ||
        product.name === "Magazyn Energii"
      ) {
        if (!product.details?.type) {
          newErrors[product.name] = "Wybierz typ produktu.";
        }
      } else if (product.name === "Inne") {
        if (!product.details?.text) {
          newErrors[product.name] = "Wpisz szczegóły produktu.";
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateProducts()) {
      nextStep();
    }
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
        <label>Pierwsza wpłata(kwota brutto)</label>
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
        <label>Sposób płatności dla pierwszej wpłaty</label>
        <select
          name="sposobPlatnosci1"
          value={formData.sposobPlatnosci1}
          onChange={handleChange}
          required
        >
          <option value="">-- Wybierz --</option>
          <option value="Przelew">Przelew</option>
          <option value="Kredyt">Kredyt</option>
          <option value="Leasing">Leasing</option>
          <option value="Gotówka">Gotówka</option>
          <option value="Prefinans">Prefinans</option>
        </select>
      </div>
      <div className="form-group">
        <label>Brak drugiej wpłaty, klient wpłaca wszystko za pierwszą wpłatę?</label>
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
            <label>Druga wpłata (kwota brutto)</label>
            <input
              type="number"
              step="0.01"
              name="drugaWplata"
              value={formData.drugaWplata}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Sposób drugiej płatności </label>
            <select
              name="sposobPlatnosci2"
              value={formData.sposobPlatnosci2}
              onChange={handleChange}
            >
              <option value="">-- Wybierz --</option>
              <option value="Przelew">Przelew</option>
              <option value="Kredyt">Kredyt</option>
              <option value="Leasing">Leasing</option>
              <option value="Gotówka">Gotówka</option>
              <option value="Prefinans">Prefinans</option>
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
                  checked={formData.przedaneProdukty.some(
                    (p) => p.name === product
                  )}
                  onChange={() => onProductChange(product)}
                />
                <span
                  className={`product-tag product-${product
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {product}
                </span>
              </label>
              {formData.przedaneProdukty.some((p) => p.name === product) && (
                <div className="product-details">
                  {product === "Fotowoltaika" && (
                    <>
                      <select
                        value={productDetails[product]?.type || ""}
                        onChange={(e) =>
                          handleDetailChange(product, "type", e.target.value)
                        }
                        required
                      >
                        <option value="">-- Wybierz typ --</option>
                        <option value="Risen 420W (5,04 kWp)">
                          Risen 420W (5,04 kWp)
                        </option>
                        <option value="Risen 520W (5,04 kWp)">
                          Risen 520W (5,04 kWp)
                        </option>
                      </select>
                      {errors[product] && (
                        <span className="error">{errors[product]}</span>
                      )}
                    </>
                  )}
                  {product === "Magazyn Energii" && (
                    <>
                      <select
                        value={productDetails[product]?.type || ""}
                        onChange={(e) =>
                          handleDetailChange(product, "type", e.target.value)
                        }
                        required
                      >
                        <option value="">-- Wybierz typ --</option>
                        <option value="Deye 5 kWh (10 kWh)">
                          Deye 5 kWh (10 kWh)
                        </option>
                      </select>
                      {errors[product] && (
                        <span className="error">{errors[product]}</span>
                      )}
                    </>
                  )}
                  {product === "Inne" && (
                    <>
                      <input
                        type="text"
                        placeholder="Wpisz szczegóły"
                        value={productDetails[product]?.text || ""}
                        onChange={(e) =>
                          handleDetailChange(product, "text", e.target.value)
                        }
                        required
                      />
                      {errors[product] && (
                        <span className="error">{errors[product]}</span>
                      )}
                    </>
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
        <button
          type="button"
          className="action-button"
          onClick={handleNextStep}
        >
          Dalej
        </button>
      </div>
    </div>
  );
};

export default FinanceStep;
