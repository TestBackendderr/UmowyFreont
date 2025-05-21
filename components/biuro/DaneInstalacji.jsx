import React from "react";

const DaneInstalacji = ({ umowa }) => {
  const { przedaneProdukty = [] } = umowa;

  return (
    <div className="biuro2-section">
      <h3 className="section-title">Dane Instalacji</h3>
      {przedaneProdukty.length > 0 ? (
        <div className="produkty">
          {przedaneProdukty.map((produkt, index) => (
            <p key={index} className="produkt-item">
              <strong>{produkt.name}</strong>:{" "}
              {produkt.details?.type || "Brak danych"}
            </p>
          ))}
        </div>
      ) : (
        <p className="brak-produktow">Brak produktów</p>
      )}
    </div>
  );
};

export default DaneInstalacji;
