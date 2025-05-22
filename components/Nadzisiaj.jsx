import React from "react";

const mockData = [
  {
    id: 1,
    client: "Jan Kowalski",
    date: "2025-05-08",
    agent: "Bartek Test",
    products: ["Fotowoltaika", "Pompa Ciepła"],
    description: "Spotkanie w sprawie instalacji fotowoltaicznej na dachu.",
    status: "Dodana",
  },
  {
    id: 2,
    client: "Anna Nowak",
    date: "2025-05-08",
    agent: "Marcin Test",
    products: ["Klimatyzacje"],
    description: "Konsultacja dotycząca klimatyzacji w biurze.",
    status: "Sprawdzona",
  },
];

const Nadzisiaj = () => {
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <div className="nadzisiaj">
      <h3>Spotkania na dzisiaj</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Klient</th>
              <th>Data podpisania</th>
              <th>Handlowiec</th>
              <th>Sprzedane produkty</th>
              <th>Opis</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((item) => (
              <tr key={item.id}>
                <td>{item.client}</td>
                <td>{item.date}</td>
                <td>{item.agent}</td>
                <td>
                  <div className="products-container">
                    {item.products.map((product) => (
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
                </td>
                <td className="description-cell">
                  <span title={item.description}>
                    {truncateText(item.description, 50)}
                  </span>
                </td>
                <td>
                  <span
                    className={`status-tag status-${item.status.toLowerCase()}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Nadzisiaj;
