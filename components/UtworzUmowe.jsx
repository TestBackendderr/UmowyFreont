import React, { useState } from "react";
import { useRouter } from "next/router";

const UtworzUmowe = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    handlowiec: "",
    imieNazwisko: "",
    telefon: "",
    peselNip: "",
    dowod: "",
    tel2: "",
    kontaktowyTel: "",
    email: "",
    ulica: "",
    miejscowosc: "",
    kodPocztowy: "",
    powiat: "",
    wojewodztwo: "",
    adresImie: "",
    adresUlica: "",
    adresNrDomu: "",
    adresMiejscowosc: "",
    adresKodPocztowy: "",
    adresPowiat: "",
    adresWojewodztwo: "",
    czyPosiadaInstalacje: "",
    miejsceInstalacji: "",
    miUlica: "",
    miNrDomu: "",
    miMiejscowosc: "",
    miKod: "",
    miPowiat: "",
    miWojewodztwo: "",
    miejsceMontazu: "",
    lancuchy: "",
    licznikLokalizacja: "",
    zasiegInternetu: "",
    dwieKreski: "",
    odgromowa: "",
    numerDzialki: "",
    mocPrzylaczeniowa: "",
    zabezpieczenie: "",
    fazowa: "",
    taryfa: "",
    numerLicznika: "",
    numerPpm: "",
    numerUmowy: "",
    operatorOsd: "",
    czyWlascicielLicznika: "",
    cenaBrutto: "",
    pierwszaWplata: "",
    sposobPlatnosci1: "",
    czyJednaWplata: "",
    drugaWplata: "",
    sposobPlatnosci2: "",
    powierzchniaDomu: "",
    uwagiHandlowca: "",
    banerZamontowany: "",
    handlowiecWynagrodzenie: "",
    rodzajKlienta: "",
    dataPodpisania: "",
    przedaneProdukty: [],
    opisUmowyBOK: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (product) => {
    setFormData((prev) => {
      const updatedProducts = prev.przedaneProdukty.includes(product)
        ? prev.przedaneProdukty.filter((p) => p !== product)
        : [...prev.przedaneProdukty, product];
      return { ...prev, przedaneProdukty: updatedProducts };
    });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    router.push("/");
  };

  const products = [
    "Fotowoltaika",
    "Magazyn Energii",
    "Magazyn Ciepła",
    "Klimatyzacje",
    "Pompa Ciepła",
    "Inne",
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="step">
            <h3>Dane osobowe</h3>
            <div className="form-group">
              <label>Handlowiec</label>
              <input
                type="text"
                name="handlowiec"
                value={formData.handlowiec}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Imię i nazwisko</label>
              <input
                type="text"
                name="imieNazwisko"
                value={formData.imieNazwisko}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Telefon</label>
              <input
                type="text"
                name="telefon"
                value={formData.telefon}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>PESEL/NIP</label>
              <input
                type="text"
                name="peselNip"
                value={formData.peselNip}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Dowód</label>
              <input
                type="text"
                name="dowod"
                value={formData.dowod}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Telefon 2 (opcjonalny)</label>
              <input
                type="text"
                name="tel2"
                value={formData.tel2}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Telefon kontaktowy (opcjonalny)</label>
              <input
                type="text"
                name="kontaktowyTel"
                value={formData.kontaktowyTel}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email (opcjonalny)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="navigation">
              <button
                type="button"
                className="action-button"
                onClick={nextStep}
              >
                Dalej
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step">
            <h3>Adresy</h3>
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
                onChange={handleChange}
                required
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
            <div className="form-group">
              <label>Adres Imię</label>
              <input
                type="text"
                name="adresImie"
                value={formData.adresImie}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Adres Ulica</label>
              <input
                type="text"
                name="adresUlica"
                value={formData.adresUlica}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Adres Nr Domu</label>
              <input
                type="text"
                name="adresNrDomu"
                value={formData.adresNrDomu}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Adres Miejscowość</label>
              <input
                type="text"
                name="adresMiejscowosc"
                value={formData.adresMiejscowosc}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Adres Kod Pocztowy</label>
              <input
                type="text"
                name="adresKodPocztowy"
                value={formData.adresKodPocztowy}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Adres Powiat</label>
              <input
                type="text"
                name="adresPowiat"
                value={formData.adresPowiat}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Adres Województwo</label>
              <input
                type="text"
                name="adresWojewodztwo"
                value={formData.adresWojewodztwo}
                onChange={handleChange}
                required
              />
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
                onClick={nextStep}
              >
                Dalej
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step">
            <h3>Instalacja</h3>
            <div className="form-group">
              <label>Czy posiada instalację</label>
              <input
                type="text"
                name="czyPosiadaInstalacje"
                value={formData.czyPosiadaInstalacje}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Miejsce instalacji (opcjonalne)</label>
              <input
                type="text"
                name="miejsceInstalacji"
                value={formData.miejsceInstalacji}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>MI Ulica (opcjonalne)</label>
              <input
                type="text"
                name="miUlica"
                value={formData.miUlica}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>MI Nr Domu (opcjonalne)</label>
              <input
                type="text"
                name="miNrDomu"
                value={formData.miNrDomu}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>MI Miejscowość (opcjonalne)</label>
              <input
                type="text"
                name="miMiejscowosc"
                value={formData.miMiejscowosc}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>MI Kod (opcjonalne)</label>
              <input
                type="text"
                name="miKod"
                value={formData.miKod}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>MI Powiat (opcjonalne)</label>
              <input
                type="text"
                name="miPowiat"
                value={formData.miPowiat}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>MI Województwo (opcjonalne)</label>
              <input
                type="text"
                name="miWojewodztwo"
                value={formData.miWojewodztwo}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Miejsce montażu (opcjonalne)</label>
              <input
                type="text"
                name="miejsceMontazu"
                value={formData.miejsceMontazu}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Łańcuchy (opcjonalne)</label>
              <input
                type="text"
                name="lancuchy"
                value={formData.lancuchy}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Licznik lokalizacja (opcjonalne)</label>
              <input
                type="text"
                name="licznikLokalizacja"
                value={formData.licznikLokalizacja}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Zasięg internetu (opcjonalne)</label>
              <input
                type="text"
                name="zasiegInternetu"
                value={formData.zasiegInternetu}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Dwie kreski (opcjonalne)</label>
              <input
                type="text"
                name="dwieKreski"
                value={formData.dwieKreski}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Odgromowa (opcjonalne)</label>
              <input
                type="text"
                name="odgromowa"
                value={formData.odgromowa}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Numer działki (opcjonalne)</label>
              <input
                type="text"
                name="numerDzialki"
                value={formData.numerDzialki}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Moc przyłączeniowa (opcjonalne)</label>
              <input
                type="text"
                name="mocPrzylaczeniowa"
                value={formData.mocPrzylaczeniowa}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Zabezpieczenie (opcjonalne)</label>
              <input
                type="text"
                name="zabezpieczenie"
                value={formData.zabezpieczenie}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Fazowa (opcjonalne)</label>
              <input
                type="text"
                name="fazowa"
                value={formData.fazowa}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Taryfa (opcjonalne)</label>
              <input
                type="text"
                name="taryfa"
                value={formData.taryfa}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Numer licznika (opcjonalne)</label>
              <input
                type="text"
                name="numerLicznika"
                value={formData.numerLicznika}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Numer PPM (opcjonalne)</label>
              <input
                type="text"
                name="numerPpm"
                value={formData.numerPpm}
                onChange={handleChange}
              />
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
                onClick={nextStep}
              >
                Dalej
              </button>
            </div>
          </div>
        );
      case 4:
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
              <button
                type="button"
                className="action-button"
                onClick={nextStep}
              >
                Dalej
              </button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="step">
            <h3>Dodatkowe informacje</h3>
            <div className="form-group">
              <label>Uwagi handlowca (opcjonalne)</label>
              <textarea
                name="uwagiHandlowca"
                value={formData.uwagiHandlowca}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Baner zamontowany (opcjonalne)</label>
              <input
                type="text"
                name="banerZamontowany"
                value={formData.banerZamontowany}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Wynagrodzenie handlowca (opcjonalne)</label>
              <input
                type="number"
                step="0.01"
                name="handlowiecWynagrodzenie"
                value={formData.handlowiecWynagrodzenie}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Rodzaj klienta</label>
              <input
                type="text"
                name="rodzajKlienta"
                value={formData.rodzajKlienta}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Data podpisania</label>
              <input
                type="date"
                name="dataPodpisania"
                value={formData.dataPodpisania}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Opis umowy BOK</label>
              <textarea
                name="opisUmowyBOK"
                value={formData.opisUmowyBOK}
                onChange={handleChange}
                required
              />
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
                onClick={handleSubmit}
              >
                Zakończ
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="utworz-umowe">
      <h2>Tworzenie Umowy</h2>
      <div className="step-indicator">
        <span className={step === 1 ? "active" : ""}>1. Dane osobowe</span>
        <span className={step === 2 ? "active" : ""}>2. Adresy</span>
        <span className={step === 3 ? "active" : ""}>3. Instalacja</span>
        <span className={step === 4 ? "active" : ""}>4. Finanse</span>
        <span className={step === 5 ? "active" : ""}>
          5. Dodatkowe informacje
        </span>
      </div>
      {renderStep()}
    </div>
  );
};

export default UtworzUmowe;
