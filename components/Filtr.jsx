import React from "react";

// Создан компонент Filtr для обработки фильтров
const Filtr = ({ filters, onFilterChange }) => {
  return (
    // Перенесена разметка фильтров из ListaUmow
    <div className="filters">
      <input
        type="text"
        name="client"
        placeholder="Filtruj po kliencie"
        value={filters.client}
        onChange={onFilterChange}
        className="filter-input"
      />
      <select
        name="dateSort"
        value={filters.dateSort}
        onChange={onFilterChange}
        className="filter-input"
      >
        <option value="">Wybierz sortowanie daty</option>
        <option value="newToOld">Od nowych do starych</option>
        <option value="oldToNew">Od starych do nowych</option>
      </select>
      <input
        type="text"
        name="product"
        placeholder="Filtruj po produkcie"
        value={filters.product}
        onChange={onFilterChange}
        className="filter-input"
      />
    </div>
  );
};

export default Filtr;