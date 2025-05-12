import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Leftside from "@/components/Leftside";

const UmowaWiecej = () => {
  const [umowa, setUmowa] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchUmowa = async () => {
      if (!id) return;

      try {
        const response = await fetch(`${apiUrl}/umowa/${id}`);
        const data = await response.json();
        setUmowa(data);
      } catch (error) {
        console.error("Błąd podczas pobierania umowy:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUmowa();
  }, [id, apiUrl]);

  if (loading)
    return <div className="main-content">Ładowanie danych umowy...</div>;

  if (!umowa) return <div className="main-content">Brak dostępnej umowy</div>;

  return (
    <div className="umowa-wiecej-container">
      <Navbar />
      <Leftside />
      <div className="main-content">
        <h1>{umowa.numerUmowy}</h1>

        <div className="umowa-section">
          <h3>Klient</h3>
          <p>{umowa.imieNazwisko}</p>
        </div>

        <div className="umowa-section">
          <h3>Data podpisania</h3>
          <p>{new Date(umowa.dataPodpisania).toLocaleDateString()}</p>
        </div>

        <div className="umowa-section">
          <h3>Handlowiec</h3>
          <p>{umowa.handlowiec}</p>
        </div>

        <div className="umowa-section">
          <h3>Sprzedane produkty</h3>
          <div className="products-selection">
            {umowa.przedaneProdukty?.map((product) => (
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
          <strong>Email:</strong> {umowa.email || "Brak"}
        </p>
        <p>
          <strong>Operator OSD:</strong> {umowa.operatorOsd}
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
        {umowa.czyJednaWplata?.toLowerCase() !== "tak" && (
          <>
            <p>
              <strong>Druga wpłata:</strong> {umowa.drugaWplata || "Brak"} zł
            </p>
            <p>
              <strong>Sposób płatności 2:</strong>{" "}
              {umowa.sposobPlatnosci2 || "Brak"}
            </p>
          </>
        )}

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
      </div>
    </div>
  );
};

export default UmowaWiecej;
