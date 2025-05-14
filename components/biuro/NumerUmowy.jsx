import React from "react";

const NumerUmowy = ({ umowa }) => {
  return (
    <div className="biuro2-section">
      <p>Numer Umowy: {umowa.numerUmowy}</p>
      <p>Handlowiec: {umowa.handlowiec}</p>
    </div>
  );
};

export default NumerUmowy;
