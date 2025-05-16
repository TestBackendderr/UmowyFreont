import React from "react";

const Dane = ({ umowa }) => {
  let adres = {
    ulica: "",
    miejscowosc: "",
    kodPocztowy: "",
    powiat: "",
    wojewodztwo: "",
  };

  switch (umowa.miejsceInstalacji) {
    case "Adres klienta":
      adres = {
        ulica: umowa.ulica,
        miejscowosc: umowa.miejscowosc,
        kodPocztowy: umowa.kodPocztowy,
        powiat: umowa.powiat,
        wojewodztwo: umowa.wojewodztwo,
      };
      break;
    case "Adres korespondencyjny":
      adres = {
        ulica: umowa.adresUlica,
        miejscowosc: umowa.adresMiejscowosc,
        kodPocztowy: umowa.adresKodPocztowy,
        powiat: umowa.adresPowiat,
        wojewodztwo: umowa.adresWojewodztwo,
      };
      break;
    case "Inny":
      adres = {
        ulica: umowa.miUlica,
        miejscowosc: umowa.miMiejscowosc,
        kodPocztowy: umowa.miKod,
        powiat: umowa.miPowiat,
        wojewodztwo: umowa.miWojewodztwo,
      };
      break;
    default:
      break;
  }

  return (
    <div className="biuro2-section">
      <h3>Adres instalacji</h3>
      <p>Ul. {adres.ulica}</p>
      <p>
        {adres.kodPocztowy} {adres.miejscowosc}
      </p>
      <p>Powiat: {adres.powiat}</p>
      <p>Województwo: {adres.wojewodztwo}</p>
    </div>
  );
};

export default Dane;
