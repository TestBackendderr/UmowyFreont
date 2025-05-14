import React, { useState } from "react";

const Platnosci = () => {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [payments, setPayments] = useState([]);
  const [indexToDelete, setIndexToDelete] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleAddInvoiceClick = () => {
    setShowLinkInput(true);
  };

  const handleLinkSubmit = () => {
    if (!amount || !description || !link) return;

    const normalizedAmount = amount.trim().endsWith("zł")
      ? amount.trim()
      : `${amount.trim()} zł`;

    const newPayment = { amount: normalizedAmount, description, link };

    setPayments([...payments, newPayment]);
    resetForm();
  };

  const resetForm = () => {
    setAmount("");
    setDescription("");
    setLink("");
    setShowLinkInput(false);
  };

  const confirmDelete = (index) => {
    setIndexToDelete(index);
  };

  const handleConfirmDelete = () => {
    const updatedPayments = payments.filter(
      (_, index) => index !== indexToDelete
    );
    setPayments(updatedPayments);
    setIndexToDelete(null);
  };

  const handleCancelDelete = () => {
    setIndexToDelete(null);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditMode(null);
    setEditValue("");
  };

  const selectFieldToEdit = (field) => {
    const currentValue = payments[editIndex][field].replace(/\s?zł$/, "");
    setEditMode(field);
    setEditValue(currentValue);
  };

  const handleEditSave = () => {
    if (!editValue.trim()) return;

    const updatedPayments = [...payments];
    const value =
      editMode === "amount" && !editValue.trim().endsWith("zł")
        ? `${editValue.trim()} zł`
        : editValue.trim();

    updatedPayments[editIndex][editMode] = value;
    setPayments(updatedPayments);

    setEditIndex(null);
    setEditMode(null);
    setEditValue("");
  };

  const handleEditCancel = () => {
    setEditIndex(null);
    setEditMode(null);
    setEditValue("");
  };

  const toRoman = (num) => {
    const romanNumerals = [
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
      "X",
      "XI",
      "XII",
      "XIII",
      "XIV",
      "XV",
      "XVI",
      "XVII",
      "XVIII",
      "XIX",
      "XX",
    ];
    return romanNumerals[num - 1] || num;
  };

  return (
    <div className="biuro2-section">
      <h3>Płatności</h3>
      <p>
        Całkowity koszt instalacji: <strong>45 000 zł</strong>
      </p>

      {payments.length === 0 && <p>Brak danych.</p>}

      {payments.map((payment, index) => (
        <div
          key={index}
          style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}
        >
          <a
            href={payment.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "black", textDecoration: "none", flexGrow: 1 }}
          >
            Wpłata {toRoman(index + 1)} – {payment.amount} –{" "}
            {payment.description}
          </a>
          <button
            onClick={() => startEdit(index)}
            className="submit-link-button"
            style={{ marginLeft: "8px" }}
          >
            Edytuj
          </button>
          <button
            onClick={() => confirmDelete(index)}
            className="cancel-link-button"
            style={{ marginLeft: "8px" }}
          >
            Usuń
          </button>
        </div>
      ))}

      {indexToDelete !== null && (
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <p>
            Usunąć:{" "}
            <strong>
              Wpłata {toRoman(indexToDelete + 1)} –{" "}
              {payments[indexToDelete]?.amount} –{" "}
              {payments[indexToDelete]?.description}
            </strong>
            ?
          </p>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              className="submit-link-button"
              onClick={handleConfirmDelete}
            >
              Tak
            </button>
            <button className="cancel-link-button" onClick={handleCancelDelete}>
              Nie
            </button>
          </div>
        </div>
      )}

      {editIndex !== null && editMode === null && (
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <p>
            Edytujesz:{" "}
            <strong>
              Wpłata {toRoman(editIndex + 1)} – {payments[editIndex]?.amount} –{" "}
              {payments[editIndex]?.description}
            </strong>
          </p>
          <p>Co chcesz edytować?</p>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => selectFieldToEdit("amount")}
              className="submit-link-button"
            >
              Kwotę
            </button>
            <button
              onClick={() => selectFieldToEdit("description")}
              className="submit-link-button"
            >
              Opis
            </button>
            <button
              onClick={() => selectFieldToEdit("link")}
              className="submit-link-button"
            >
              Link
            </button>
            <button onClick={handleEditCancel} className="cancel-link-button">
              Anuluj
            </button>
          </div>
        </div>
      )}

      {editIndex !== null && editMode !== null && (
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <p>
            Edytujesz:{" "}
            <strong>
              Wpłata {toRoman(editIndex + 1)} – {payments[editIndex]?.amount} –{" "}
              {payments[editIndex]?.description}
            </strong>
          </p>
          <p>
            Zmień{" "}
            {editMode === "amount"
              ? "kwotę"
              : editMode === "description"
              ? "opis"
              : "link"}
            :
          </p>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="invoice-link-input"
          />
          <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
            <button className="submit-link-button" onClick={handleEditSave}>
              Zapisz
            </button>
            <button className="cancel-link-button" onClick={handleEditCancel}>
              Anuluj
            </button>
          </div>
        </div>
      )}

      {editIndex === null && !showLinkInput && (
        <button
          className="dodaj-faktury-button"
          onClick={handleAddInvoiceClick}
        >
          Dodaj faktury
        </button>
      )}

      {editIndex === null && showLinkInput && (
        <div className="invoice-link-container" style={{ marginTop: "10px" }}>
          <input
            type="text"
            placeholder="Kwota (np. 12 000)"
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
          <div style={{ display: "flex", gap: "8px" }}>
            <button className="submit-link-button" onClick={handleLinkSubmit}>
              Zapisz
            </button>
            <button className="cancel-link-button" onClick={resetForm}>
              Anuluj
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Platnosci;
