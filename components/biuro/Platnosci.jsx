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
  const [editAmount, setEditAmount] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLink, setEditLink] = useState("");
  const [editPaidAt, setEditPaidAt] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [confirmMode, setConfirmMode] = useState(false);

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
        const sortedPayments = data.sort((a, b) => a.id - b.id);
        setPayments(sortedPayments);
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
    return `${parseFloat(amount).toLocaleString("pl-PL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} zł`;
  };

  const parseAmount = (input) => {
    const cleaned = input.replace(/[^0-9]/g, "");
    return parseInt(cleaned, 10);
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const calculateRemainingAmount = () => {
    const totalPaid = payments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );
    const totalCost = umowa.cenaBrutto;
    const remaining = totalCost - totalPaid;
    return remaining >= 0 ? remaining : 0;
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

  const handleStartDelete = () => {
    setDeleteMode(true);
    setIdToDelete(null);
  };

  const selectPaymentToDelete = (id) => {
    setIdToDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (!idToDelete) {
      setError("Wybierz płatność do usunięcia");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${apiUrl}/payments/${idToDelete}`);
      setPayments(payments.filter((p) => p.id !== idToDelete));
      setIdToDelete(null);
      setDeleteMode(false);
    } catch (err) {
      setError(err.response?.data?.message || "Nie udało się usunąć płatności");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setIdToDelete(null);
    setDeleteMode(false);
  };

  const handleStartEdit = () => {
    setEditMode(true);
    setEditId(null);
  };

  const selectPaymentToEdit = (id) => {
    const payment = payments.find((p) => p.id === id);
    setEditId(id);
    setEditAmount(payment.amount.toString());
    setEditDescription(payment.description || "");
    setEditLink(payment.link || "");
    setEditPaidAt(payment.paidAt ? formatDate(payment.paidAt) : "");
    setEditMode(false);
  };

  const handleEditSave = async () => {
    if (!editAmount.trim() || !editDescription.trim() || !editLink.trim()) {
      setError("Kwota, opis i link są wymagane");
      return;
    }

    if (isNaN(umowaId)) {
      setError("Nieprawidłowy identyfikator umowy");
      return;
    }

    const parsedAmount = parseAmount(editAmount);
    if (isNaN(parsedAmount)) {
      setError("Nieprawidłowa kwota");
      return;
    }

    if (editPaidAt && !/^\d{4}-\d{2}-\d{2}$/.test(editPaidAt)) {
      setError("Nieprawidłowy format daty (YYYY-MM-DD)");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.put(`${apiUrl}/payments/${editId}`, {
        amount: parsedAmount,
        description: editDescription,
        link: editLink,
        paidAt: editPaidAt ? new Date(editPaidAt).toISOString() : null,
        umowaId: umowaId,
      });

      setPayments(payments.map((p) => (p.id === editId ? data : p)));
      setEditId(null);
      setEditAmount("");
      setEditDescription("");
      setEditLink("");
      setEditPaidAt("");
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
    setEditAmount("");
    setEditDescription("");
    setEditLink("");
    setEditPaidAt("");
    setEditMode(false);
  };

  const handleStartConfirm = () => {
    setConfirmMode(true);
    setConfirmId(null);
  };

  const selectPaymentToConfirm = (id) => {
    setConfirmId(id);
  };

  const handleConfirmPayment = async () => {
    if (!confirmId) {
      setError("Wybierz płatność do potwierdzenia");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const payment = payments.find((p) => p.id === confirmId);
      const isConfirmed = payment.isConfirmed === "Niepotwierdzona";
      const { data } = await axios.put(
        `${apiUrl}/payments/${confirmId}/confirm`,
        {
          isConfirmed,
        }
      );
      setPayments(payments.map((p) => (p.id === confirmId ? data : p)));
      setConfirmId(null);
      setConfirmMode(false);
    } catch (err) {
      setError(
        err.response?.data?.message || "Nie udało się potwierdzić płatności"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelConfirm = () => {
    setConfirmId(null);
    setConfirmMode(false);
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
    return `${parseFloat(cena).toLocaleString("pl-PL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} zł`;
  };

  return (
    <div className="biuro2-section">
      <h3>Płatności</h3>
      <p>
        Całkowity koszt instalacji:{" "}
        <strong>{formatCenaBrutto(umowa.cenaBrutto)}</strong>
      </p>
      <p>
        Pozostało do zapłaty:{" "}
        <strong>{formatAmount(calculateRemainingAmount())}</strong>
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
            {payment.paidAt && ` – Zapłacono: ${formatDate(payment.paidAt)}`}
            {` – Status: ${payment.isConfirmed}`}
          </a>
          {deleteMode && (
            <button
              onClick={() => selectPaymentToDelete(payment.id)}
              className={`submit-link-button ${
                idToDelete === payment.id ? "selected" : ""
              }`}
              style={{ marginLeft: "8px" }}
              disabled={loading}
            >
              {idToDelete === payment.id ? "Wybrano" : "Wybierz"}
            </button>
          )}
          {editMode && (
            <button
              onClick={() => selectPaymentToEdit(payment.id)}
              className={`submit-link-button ${
                editId === payment.id ? "selected" : ""
              }`}
              style={{ marginLeft: "8px" }}
              disabled={loading}
            >
              {editId === payment.id ? "Wybrano" : "Wybierz"}
            </button>
          )}
          {confirmMode && (
            <button
              onClick={() => selectPaymentToConfirm(payment.id)}
              className={`submit-link-button ${
                confirmId === payment.id ? "selected" : ""
              }`}
              style={{ marginLeft: "8px" }}
              disabled={loading}
            >
              {confirmId === payment.id ? "Wybrano" : "Wybierz"}
            </button>
          )}
        </div>
      ))}

      {!deleteMode &&
        !editMode &&
        !confirmMode &&
        editId === null &&
        !showLinkInput && (
          <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
            <button
              className="dodaj-faktury-button"
              onClick={handleAddInvoiceClick}
              disabled={loading || isNaN(umowaId)}
            >
              Dodaj
            </button>
            {payments.length > 0 && (
              <>
                <button
                  className="submit-link-button"
                  onClick={handleStartEdit}
                  disabled={loading}
                >
                  Edytuj
                </button>
                <button
                  className="submit-link-button"
                  onClick={handleStartConfirm}
                  disabled={loading}
                >
                  Potwierdź
                </button>
                <button
                  className="cancel-link-button"
                  onClick={handleStartDelete}
                  disabled={loading}
                >
                  Usuń
                </button>
              </>
            )}
          </div>
        )}

      {deleteMode && (
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <p>Wybierz płatność do usunięcia:</p>
          {idToDelete !== null && (
            <p>
              Wybrano:{" "}
              <strong>
                Wpłata{" "}
                {toRoman(payments.findIndex((p) => p.id === idToDelete) + 1)} –{" "}
                {formatAmount(
                  payments.find((p) => p.id === idToDelete)?.amount
                )}{" "}
                – {payments.find((p) => p.id === idToDelete)?.description}
              </strong>
            </p>
          )}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              className="submit-link-button"
              onClick={handleConfirmDelete}
              disabled={loading || !idToDelete}
            >
              Usuń
            </button>
            <button
              className="cancel-link-button"
              onClick={handleCancelDelete}
              disabled={loading}
            >
              Anuluj
            </button>
          </div>
        </div>
      )}

      {editMode && (
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <p>Wybierz płatność do edycji:</p>
          {editId !== null && (
            <p>
              Wybrano:{" "}
              <strong>
                Wpłata {toRoman(payments.findIndex((p) => p.id === editId) + 1)}{" "}
                – {formatAmount(payments.find((p) => p.id === editId)?.amount)}{" "}
                – {payments.find((p) => p.id === editId)?.description}
              </strong>
            </p>
          )}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              className="submit-link-button"
              onClick={handleEditSave}
              disabled={loading || !editId}
            >
              Edytuj
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

      {confirmMode && (
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <p>Wybierz płatność do potwierdzenia:</p>
          {confirmId !== null && (
            <p>
              Wybrano:{" "}
              <strong>
                Wpłata{" "}
                {toRoman(payments.findIndex((p) => p.id === confirmId) + 1)} –{" "}
                {formatAmount(payments.find((p) => p.id === confirmId)?.amount)}{" "}
                – {payments.find((p) => p.id === confirmId)?.description}
              </strong>
            </p>
          )}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              className="submit-link-button"
              onClick={handleConfirmPayment}
              disabled={loading || !confirmId}
            >
              {payments.find((p) => p.id === confirmId)?.isConfirmed ===
              "Potwierdzona"
                ? "Anuluj potwierdzenie"
                : "Potwierdź"}
            </button>
            <button
              className="cancel-link-button"
              onClick={handleCancelConfirm}
              disabled={loading}
            >
              Anuluj
            </button>
          </div>
        </div>
      )}

      {editId !== null && !editMode && !confirmMode && (
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <p>
            Edytujesz:{" "}
            <strong>
              Wpłata {toRoman(payments.findIndex((p) => p.id === editId) + 1)} –{" "}
              {formatAmount(payments.find((p) => p.id === editId)?.amount)} –{" "}
              {payments.find((p) => p.id === editId)?.description}
            </strong>
          </p>
          <div className="invoice-link-container">
            <input
              type="text"
              placeholder="Kwota (np. 12 000)"
              value={editAmount}
              onChange={(e) => setEditAmount(e.target.value)}
              className="invoice-link-input"
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Opis (np. Faktura Alior Bank)"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="invoice-link-input"
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Link do Google Dysk"
              value={editLink}
              onChange={(e) => setEditLink(e.target.value)}
              className="invoice-link-input"
              disabled={loading}
            />
            <input
              type="date"
              placeholder="YYYY-MM-DD"
              value={editPaidAt}
              onChange={(e) => setEditPaidAt(e.target.value)}
              className="invoice-link-input"
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
        </div>
      )}

      {editId === null && !confirmMode && showLinkInput && (
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
