import React from "react";

const FinanceStep = ({
  formData,
  handleChange,
  handleProductChange,
  products,
  prevStep,
  nextStep,
}) => {
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
        <input
          type="text"
          name="operatorOsd"
          value={formData.operatorOsd}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Czy właściciel licznika</label>
        <input
          type="text"
          name="czyWlascicielLicznika"
          value={formData.czyWlascicielLicznika}
          onChange={handleChange}
          required
        />
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
        <label>Pierwsza wpłata</label>
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
        <input
          type="text"
          name="sposobPlatnosci1"
          value={formData.sposobPlatnosci1}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Czy jedna wpłata</label>
        <input
          type="text"
          name="czyJednaWplata"
          value={formData.czyJednaWplata}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Druga wpłata (opcjonalne)</label>
        <input
          type="number"
          step="0.01"
          name="drugaWplata"
          value={formData.drugaWplata}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Sposób płatności 2 (opcjonalne)</label>
        <input
          type="text"
          name="sposobPlatnosci2"
          value={formData.sposobPlatnosci2}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Powierzchnia domu (opcjonalne)</label>
        <input
          type="text"
          name="powierzchniaDomu"
          value={formData.powierzchniaDomu}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Przedane produkty</label>
        <div className="products-selection">
          {products.map((product) => (
            <label key={product} className="product-checkbox">
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