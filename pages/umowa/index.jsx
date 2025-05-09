import React from "react";
import Navbar from "@/components/Navbar";
import Leftside from "@/components/Leftside";

const UmowaWiecej = () => {
  const umowy = [
    {
      id: 1,
      numerUmowy: "UM/2025/001",
      imieNazwisko: "Jan Kowalski",
      dataPodpisania: "2025-05-01",
      handlowiec: "Bartek Test",
      przedaneProdukty: ["Fotowoltaika", "Magazyn Energii"],
      opisUmowyBOK:
        "Umowa dotyczy instalacji fotowoltaicznej o mocy 5 kW z magazynem energii 10 kWh. Klient wybrał opcję płatności w dwóch ratach. Montaż planowany na dach budynku mieszkalnego. Dodatkowe uwagi: klient wymaga wizyty technicznej przed instalacją.",
      fullOpis:
        "Umowa dotyczy instalacji fotowoltaicznej o mocy 5 kW z magazynem energii 10 kWh. Klient wybrał opcję płatności w dwóch ratach. Montaż planowany na dach budynku mieszkalnego. Dodatkowe uwagi: klient wymaga wizyty technicznej przed instalacją, a także instalacji odgromowej. Termin realizacji: 15.06.2025.",
      telefon: "+48 123 456 789",
      ulica: "ul. Słoneczna 12",
      miejscowosc: "Kraków",
      kodPocztowy: "30-001",
      powiat: "Krakowski",
      wojewodztwo: "Małopolskie",
      rodzajKlienta: "Osoba fizyczna",
      peselNip: "12345678901",
      dowod: "ABC123456",
      tel2: "+48 987 654 321",
      kontaktowyTel: "+48 555 666 777",
      email: "jan.kowalski@example.com",
      operatorOsd: "PGE Dystrybucja",
      czyWlascicielLicznika: "Tak",
      adresImie: "Jan Kowalski",
      adresUlica: "ul. Zielona 5",
      adresNrDomu: "5",
      adresMiejscowosc: "Kraków",
      adresKodPocztowy: "30-002",
      adresPowiat: "Krakowski",
      adresWojewodztwo: "Małopolskie",
      czyPosiadaInstalacje: "Nie",
      miejsceInstalacji: "Adres klienta",
      miUlica: "ul. Słoneczna 12",
      miNrDomu: "12",
      miMiejscowosc: "Kraków",
      miKod: "30-001",
      miPowiat: "Krakowski",
      miWojewodztwo: "Małopolskie",
      miejsceMontazu: "Dach budynku mieszkalnego",
      lancuchy: "2",
      licznikLokalizacja: "w budynku mieszkalnym w środku",
      zasiegInternetu: "WiFi",
      dwieKreski: "Tak",
      odgromowa: "Nie",
      numerDzialki: "123/45",
      mocPrzylaczeniowa: "10 kW",
      zabezpieczenie: "25A",
      fazowa: "Trójfazowa",
      taryfa: "G11",
      numerLicznika: "12345678",
      numerPpm: "PPM123",
      cenaBrutto: "25000",
      pierwszaWplata: "15000",
      sposobPlatnosci1: "Przelew",
      czyJednaWplata: "Nie",
      drugaWplata: "10000",
      sposobPlatnosci2: "Gotówka",
      powierzchniaDomu: "120",
      uwagiHandlowca: "Klient wymaga szybkiego montażu.",
      banerZamontowany: "Tak",
      handlowiecWynagrodzenie: "Bartek Test",
    },
  ];

  const umowa = umowy[0];

  if (!umowa) {
    return <div className="main-content">Brak dostępnych umów</div>;
  }

  return (
    <div className="umowa-wiecej-container">
      <Navbar />
      <Leftside />
      <div className="main-content">
        <h1>{umowa.numerUmowy}</h1>

        <div className="umowa-section">
          <h3>Klient (imię nazwisko / dane firmy)</h3>
          <p>{umowa.imieNazwisko}</p>
        </div>

        <div className="umowa-section">
          <h3>Data podpisania umowy</h3>
          <p>{umowa.dataPodpisania}</p>
        </div>

        <div className="umowa-section">
          <h3>Handlowiec</h3>
          <p>{umowa.handlowiec}</p>
        </div>

        <div className="umowa-section">
          <h3>Sprzedane produkty</h3>
          <div className="products-selection">
            {umowa.przedaneProdukty.map((product) => (
              <span
                key={product}
                className={`product-tag product-${product
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {product}
              </span>
            ))}
          </div>
        </div>

        <div className="umowa-section">
          <h3>Opis umowy BOK</h3>
          <p className="opis-bok">{umowa.opisUmowyBOK}</p>
        </div>

        <hr />

        <h2>Dane klienta</h2>
        <p>
          <strong>Telefon:</strong> {umowa.telefon}
        </p>
        <p>
          <strong>Ulica:</strong> {umowa.ulica}
        </p>
        <p>
          <strong>Miejscowość:</strong> {umowa.miejscowosc}
        </p>
        <p>
          <strong>Kod pocztowy:</strong> {umowa.kodPocztowy}
        </p>
        <p>
          <strong>Powiat:</strong> {umowa.powiat}
        </p>
        <p>
          <strong>Województwo:</strong> {umowa.wojewodztwo}
        </p>
        <p>
          <strong>Rodzaj klienta:</strong> {umowa.rodzajKlienta}
        </p>
        <p>
          <strong>PESEL/NIP:</strong> {umowa.peselNip}
        </p>
        <p>
          <strong>Dowód:</strong> {umowa.dowod}
        </p>
        <p>
          <strong>Telefon 2:</strong> {umowa.tel2}
        </p>
        <p>
          <strong>Telefon kontaktowy:</strong> {umowa.kontaktowyTel}
        </p>
        <p>
          <strong>Email:</strong> {umowa.email}
        </p>
        <p>
          <strong>Operator OSD:</strong> {umowa.operatorOsd}
        </p>
        <p>
          <strong>Czy właściciel licznika:</strong>{" "}
          {umowa.czyWlascicielLicznika}
        </p>

        <hr />

        <h2>Adres korespondencyjny</h2>
        <p>
          <strong>Imię i nazwisko:</strong> {umowa.adresImie}
        </p>
        <p>
          <strong>Ulica:</strong> {umowa.adresUlica}
        </p>
        <p>
          <strong>Nr domu:</strong> {umowa.adresNrDomu}
        </p>
        <p>
          <strong>Miejscowość:</strong> {umowa.adresMiejscowosc}
        </p>
        <p>
          <strong>Kod pocztowy:</strong> {umowa.adresKodPocztowy}
        </p>
        <p>
          <strong>Powiat:</strong> {umowa.adresPowiat}
        </p>
        <p>
          <strong>Województwo:</strong> {umowa.adresWojewodztwo}
        </p>

        <hr />

        <h2>Oferta</h2>
        <p>
          <strong>Czy posiada instalację PV:</strong>{" "}
          {umowa.czyPosiadaInstalacje}
        </p>
        <p>
          <strong>Miejsce instalacji:</strong> {umowa.miejsceInstalacji}
        </p>
        <p>
          <strong>Ulica:</strong> {umowa.miUlica}
        </p>
        <p>
          <strong>Nr domu:</strong> {umowa.miNrDomu}
        </p>
        <p>
          <strong>Miejscowość:</strong> {umowa.miMiejscowosc}
        </p>
        <p>
          <strong>Kod:</strong> {umowa.miKod}
        </p>
        <p>
          <strong>Powiat:</strong> {umowa.miPowiat}
        </p>
        <p>
          <strong>Województwo:</strong> {umowa.miWojewodztwo}
        </p>
        <p>
          <strong>Miejsce montażu:</strong> {umowa.miejsceMontazu}
        </p>
        <p>
          <strong>Łańcuchy:</strong> {umowa.lancuchy}
        </p>
        <p>
          <strong>Lokalizacja licznika:</strong> {umowa.licznikLokalizacja}
        </p>
        <p>
          <strong>Zasięg Internetu:</strong> {umowa.zasiegInternetu}
        </p>
        <p>
          <strong>2 kreski zasięgu:</strong> {umowa.dwieKreski}
        </p>
        <p>
          <strong>Instalacja odgromowa:</strong> {umowa.odgromowa}
        </p>
        <p>
          <strong>Numer działki:</strong> {umowa.numerDzialki}
        </p>
        <p>
          <strong>Moc przyłączeniowa:</strong> {umowa.mocPrzylaczeniowa}
        </p>
        <p>
          <strong>Zabezpieczenie:</strong> {umowa.zabezpieczenie}
        </p>
        <p>
          <strong>Instalacja fazowa:</strong> {umowa.fazowa}
        </p>
        <p>
          <strong>Taryfa:</strong> {umowa.taryfa}
        </p>
        <p>
          <strong>Numer licznika:</strong> {umowa.numerLicznika}
        </p>
        <p>
          <strong>Numer PPM:</strong> {umowa.numerPpm}
        </p>

        <hr />

        <h2>Płatność</h2>
        <p>
          <strong>Cena brutto:</strong> {umowa.cenaBrutto} zł
        </p>
        <p>
          <strong>Pierwsza wpłata:</strong> {umowa.pierwszaWplata} zł
        </p>
        <p>
          <strong>Sposób płatności 1:</strong> {umowa.sposobPlatnosci1}
        </p>
        <p>
          <strong>Czy jedna wpłata:</strong> {umowa.czyJednaWplata}
        </p>
        <p>
          <strong>Druga wpłata:</strong> {umowa.drugaWplata} zł
        </p>
        <p>
          <strong>Sposób płatności 2:</strong> {umowa.sposobPlatnosci2}
        </p>

        <hr />

        <h2>Uwagi</h2>
        <p>
          <strong>Powierzchnia domu:</strong> {umowa.powierzchniaDomu} m²
        </p>
        <p>
          <strong>Uwagi handlowca:</strong> {umowa.uwagiHandlowca}
        </p>
        <p>
          <strong>Baner zamontowany:</strong> {umowa.banerZamontowany}
        </p>
        <p>
          <strong>Wynagrodzenie handlowca:</strong>{" "}
          {umowa.handlowiecWynagrodzenie}
        </p>
      </div>
    </div>
  );
};

export default UmowaWiecej;
