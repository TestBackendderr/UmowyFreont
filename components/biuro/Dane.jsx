import React from "react";

const Dane = ({ umowa }) => {
  return (
    <div className="biuro2-section">
      <h3>Dane</h3>
      <p>{umowa.imieNazwisko}</p>
      <p>Ul. Główna 1/1</p>
      <p>20-200 Mięścowośc</p>
      <p>Woj. mazowieckie</p>
      <p>{umowa.telefon}</p>
      <p>{umowa.email}</p>
    </div>
  );
};

export default Dane;
