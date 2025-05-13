import React, { useState } from "react";

const Platnosci = () => {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [payments, setPayments] = useState([]);

  const handleAddInvoiceClick = () => {
    setShowLinkInput(true);
  };

  const handleLinkSubmit = () => {
    if (!amount || !description || !link) return;

    const newPayment = {
      amount,
      description,
      link,
    };

    setPayments([...payments, newPayment]);
    setAmount("");
    setDescription("");
    setLink("");
    setShowLinkInput(false);
  };

  const toRoman = (num) => {
    const romanNumerals = [
      "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
      "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"
    ];
    return romanNumerals[num - 1] || num;
  };

  return (
    <div className="biuro2-section">
      <h3>Płatności</h3>

      {payments.length === 0 && <p>Brak danych</p>}

      {payments.map((payment, index) => (
        <p key={index}>
          <a
            href={payment.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "black", textDecoration: "none" }}
          >
            Wpłata {toRoman(index + 1)} – {payment.amount} – {payment.description}
          </a>
        </p>
      ))}

      {!showLinkInput && (
        <button className="dodaj-faktury-button" onClick={handleAddInvoiceClick}>
          Dodaj faktury
        </button>
      )}

      {showLinkInput && (
        <div className="invoice-link-container">
          <input
            type="text"
            placeholder="Kwota (np. 12 000 zł)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="invoice-link-input"
          />
          <input
            type="text"
            placeholder="Opis (np. Faktura Alior Bank)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="invoice-link-input"
          />
          <input
            type="text"
            placeholder="Link do Google Dysk"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="invoice-link-input"
          />
          <button className="submit-link-button" onClick={handleLinkSubmit}>
            Zapisz
          </button>
        </div>
      )}
    </div>
  );
};

export default Platnosci;
