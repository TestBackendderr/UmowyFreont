import React from 'react';

const Rightside = () => {
  return (
    <aside className="rightside">
      <h3>Filtry</h3>
      <div className="filter-group">
        <label htmlFor="status">Status</label>
        <select id="status">
          <option value="">Wszystkie</option>
          <option value="Dodana">Dodana</option>
          <option value="Sprawdzona">Sprawdzona</option>
          <option value="Zlecona do realizacji">Zlecona do realizacji</option>
          <option value="Umówiony montaż">Umówiony montaż</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="agent">Handlowiec</label>
        <select id="agent">
          <option value="">Wszyscy</option>
          <option value="Bartek Test">Bartek Test</option>
          <option value="Marcin Test">Marcin Test</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="date">Data</label>
        <input type="date" id="date" />
      </div>
    </aside>
  );
};

export default Rightside;