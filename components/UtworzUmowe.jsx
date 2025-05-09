import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import PersonalDataStep from "./steps/PersonalDataStep";
import AddressStep from "./steps/AddressStep";
import InstallationStep from "./steps/InstallationStep";
import FinanceStep from "./steps/FinanceStep";
import AdditionalInfoStep from "./steps/AdditionalInfoStep";

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

  const handleSubmit = async () => {
    console.log("Отправляемые данные:", formData);
    try {
      const response = await axios.post("/api/umowy", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert(`Dane zapisane! ID umowy: ${response.data.id}`);
      router.push("/");
    } catch (error) {
      console.error(
        "Błąd podczas zapisywania danych:",
        error.response ? error.response.data : error.message
      );
      alert("Błąd podczas zapisywania danych. Sprawdź консолę.");
    }
  };

  // Автоматическое заполнение адреса места установки на основе адреса клиента
  useEffect(() => {
    if (
      step === 3 &&
      formData.adresImie &&
      formData.adresUlica &&
      formData.adresNrDomu &&
      formData.adresMiejscowosc &&
      formData.adresKodPocztowy &&
      formData.adresPowiat &&
      formData.adresWojewodztwo
    ) {
      setFormData((prev) => ({
        ...prev,
        miUlica: prev.miUlica || prev.adresUlica,
        miNrDomu: prev.miNrDomu || prev.adresNrDomu,
        miMiejscowosc: prev.miMiejscowosc || prev.adresMiejscowosc,
        miKod: prev.miKod || prev.adresKodPocztowy,
        miPowiat: prev.miPowiat || prev.adresPowiat,
        miWojewodztwo: prev.miWojewodztwo || prev.adresWojewodztwo,
      }));
    }
  }, [
    step,
    formData.adresImie,
    formData.adresUlica,
    formData.adresNrDomu,
    formData.adresMiejscowosc,
    formData.adresKodPocztowy,
    formData.adresPowiat,
    formData.adresWojewodztwo,
  ]);

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
          <PersonalDataStep
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <AddressStep
            formData={formData}
            handleChange={handleChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 3:
        return (
          <InstallationStep
            formData={formData}
            handleChange={handleChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 4:
        return (
          <FinanceStep
            formData={formData}
            handleChange={handleChange}
            handleProductChange={handleProductChange}
            products={products}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 5:
        return (
          <AdditionalInfoStep
            formData={formData}
            handleChange={handleChange}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
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