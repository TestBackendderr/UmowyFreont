import React from "react";

const Historia = ({ umowa }) => {
  const historia = umowa.history || [];

  function formatDateInText(text) {
    const dateRegex = /\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}.\d{3}Z)?/g;

    const textWithoutUnderscores = text.replace(/_/g, " ");

    return textWithoutUnderscores.replace(dateRegex, (dateStr) => {
      const date = new Date(dateStr);
      if (isNaN(date)) return dateStr;

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}.${month}.${year}`;
    });
  }

  return (
    <div className="biuro2-section historia">
      <h3>Historia</h3>
      {historia.length > 0 ? (
        historia.map((entry, index) => (
          <p key={index}>{formatDateInText(entry)}</p>
        ))
      ) : (
        <p>Brak historii zmian</p>
      )}
    </div>
  );
};

export default Historia;
