import React, { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Platnosci = ({ umowaId, umowa }) => {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [payments, setPayments] = useState([]);
  const [idToDelete, setIdToDelete] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isNaN(umowaId)) {
      setError("Nieprawidłowy identyfikator umowy");
    }
  }, [umowaId]);

  useEffect(() => {
    const fetchPayments = async () => {
      if (isNaN(umowaId)) return;

      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(`${apiUrl}/payments/umowa/${umowaId}`);
        setPayments(data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Nie udało się pobrać płatności"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [umowaId]);

  const formatAmount = (amount) => {
    const zloty = Math.floor(amount / 100);
    return `${zloty.toLocaleString("pl-PL")} zł`;
  };

  const parseAmount = (input) => {
    const cleaned = input.replace(/[^0-9]/g, "");
    return parseInt(cleaned, 10) * 100;
  };

  const handleAddInvoiceClick = () => {
    setShowLinkInput(true);
    setAmount("");
    setDescription("");
    setLink("");
  };

  const handleLinkSubmit = async () => {
    if (!amount.trim() || !description.trim() || !link.trim()) {
      setError("Kwota, opis i link są wymagane");
      return;
    }

    if (isNaN(umowaId)) {
      setError("Nieprawidłowy identyfikator umowy");
      return;
    }

    const parsedAmount = parseAmount(amount);
    if (isNaN(parsedAmount)) {
      setError("Nieprawidłowa kwota");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(`${apiUrl}/payments`, {
        amount: parsedAmount,
        description,
        link,
        umowaId: umowaId,
      });

      setPayments([...payments, data]);
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "Nie udało się dodać płatności");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setAmount("");
    setDescription("");
    setLink("");
    setShowLinkInput(false);
  };

  const confirmDelete = (id) => {
    setIdToDelete(id);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${apiUrl}/payments/${idToDelete}`);
      setPayments(payments.filter((p) => p.id !== idToDelete));
      setIdToDelete(null);
    } catch (err) {
      setError(err.response?.data?.message || "Nie udało się usunąć płatności");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setIdToDelete(null);
  };

  const startEdit = (id) => {
    setEditId(id);
    setEditMode(null);
    setEditValue("");
  };

  const selectFieldToEdit = (field) => {
    const payment = payments.find((p) => p.id === editId);
    let currentValue = payment[field];
    if (field === "amount") {
      currentValue = (currentValue / 100).toString();
    }
    setEditMode(field);
    setEditValue(currentValue);
  };

  const handleEditSave = async () => {
    if (!editValue.trim()) {
      setError("Pole nie może być puste");
      return;
    }

    if (isNaN(umowaId)) {
      setError("Nieprawidłowy identyfikator umowy");
      return;
    }

    let value = editValue.trim();
    if (editMode === "amount") {
      const parsedAmount = parseAmount(value);
      if (isNaN(parsedAmount)) {
        setError("Nieprawidłowa kwota");
        return;
      }
      value = parsedAmount;
    }

    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.put(`${apiUrl}/payments/${editId}`, {
        [editMode]: value,
        umowaId: umowaId,
      });

      setPayments(payments.map((p) => (p.id === editId ? data : p)));
      setEditId(null);
      setEditMode(null);
      setEditValue("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Nie udało się edytować płatności"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
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

  const formatCenaBrutto = (cena) => {
    return `${parseFloat(cena).toLocaleString("pl-PL")} zł`;
  };

  return (
    <div className="biuro2-section">
      <h3>Płatności</h3>
      <p>
        Całkowity koszt instalacji:{" "}
        <strong>{formatCenaBrutto(umowa.cenaBrutto)}</strong>
      </p>

      {loading && <p>Ładowanie...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {payments.length === 0 && !loading && !error && <p>Brak danych.</p>}

      {payments.map((payment) => (
        <div
          key={payment.id}
          style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}
        >
          <a
            href={payment.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "black", textDecoration: "none", flexGrow: 1 }}
          >
            Wpłata {toRoman(payments.indexOf(payment) + 1)} –{" "}
            {formatAmount(payment.amount)} – {payment.description}
          </a>
          <button
            onClick={() => startEdit(payment.id)}
            className="submit-link-button"
            style={{ marginLeft: "8px" }}
            disabled={loading}
          >
            Edytuj
          </button>
          <button
            onClick={() => confirmDelete(payment.id)}
            className="cancel-link-button"
            style={{ marginLeft: "8px" }}
            disabled={loading}
          >
            Usuń
          </button>
        </div>
      ))}

      {idToDelete !== null && (
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <p>
            Usunąć:{" "}
            <strong>
              Wpłata{" "}
              {toRoman(payments.findIndex((p) => p.id === idToDelete) + 1)} –{" "}
              {formatAmount(payments.find((p) => p.id === idToDelete)?.amount)}{" "}
              – {payments.find((p) => p.id === idToDelete)?.description}
            </strong>
            ?
          </p>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              className="submit-link-button"
              onClick={handleConfirmDelete}
              disabled={loading}
            >
              Tak
            </button>
            <button
              className="cancel-link-button"
              onClick={handleCancelDelete}
              disabled={loading}
            >
              Nie
            </button>
          </div>
        </div>
      )}

      {editId !== null && editMode === null && (
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <p>
            Edytujesz:{" "}
            <strong>
              Wpłata {toRoman(payments.findIndex((p) => p.id === editId) + 1)} –{" "}
              {formatAmount(payments.find((p) => p.id === editId)?.amount)} –{" "}
              {payments.find((p) => p.id === editId)?.description}
            </strong>
          </p>
          <p>Co chcesz edytować?</p>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => selectFieldToEdit("amount")}
              className="submit-link-button"
              disabled={loading}
            >
              Kwotę
            </button>
            <button
              onClick={() => selectFieldToEdit("description")}
              className="submit-link-button"
              disabled={loading}
            >
              Opis
            </button>
            <button
              onClick={() => selectFieldToEdit("link")}
              className="submit-link-button"
              disabled={loading}
            >
              Link
            </button>
            <button
              onClick={handleEditCancel}
              className="cancel-link-button"
              disabled={loading}
            >
              Anuluj
            </button>
          </div>
        </div>
      )}

      {editId !== null && editMode !== null && (
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <p>
            Edytujesz:{" "}
            <strong>
              Wpłata {toRoman(payments.findIndex((p) => p.id === editId) + 1)} –{" "}
              {formatAmount(payments.find((p) => p.id === editId)?.amount)} –{" "}
              {payments.find((p) => p.id === editId)?.description}
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
            placeholder={
              editMode === "amount"
                ? "Np. 12 000"
                : editMode === "description"
                ? "Np. Faktura Alior Bank"
                : "Np. Link do Google Dysk"
            }
            disabled={loading}
          />
          <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
            <button
              className="submit-link-button"
              onClick={handleEditSave}
              disabled={loading}
            >
              Zapisz
            </button>
            <button
              className="cancel-link-button"
              onClick={handleEditCancel}
              disabled={loading}
            >
              Anuluj
            </button>
          </div>
        </div>
      )}

      {editId === null && !showLinkInput && (
        <button
          className="dodaj-faktury-button"
          onClick={handleAddInvoiceClick}
          disabled={loading || isNaN(umowaId)}
        >
          Dodaj faktury
        </button>
      )}

      {editId === null && showLinkInput && (
        <div className="invoice-link-container" style={{ marginTop: "10px" }}>
          <input
            type="text"
            placeholder="Kwota (np. 12 000)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="invoice-link-input"
            disabled={loading}
          />
          <input
            type="text"
            placeholder="Opis (np. Faktura Alior Bank)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="invoice-link-input"
            disabled={loading}
          />
          <input
            type="text"
            placeholder="Link do Google Dysk"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="invoice-link-input"
            disabled={loading}
          />
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              className="submit-link-button"
              onClick={handleLinkSubmit}
              disabled={loading}
            >
              Zapisz
            </button>
            <button
              className="cancel-link-button"
              onClick={resetForm}
              disabled={loading}
            >
              Anuluj
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Platnosci;
