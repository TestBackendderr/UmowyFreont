import React, { useState } from 'react';

const ListaUmow = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const initialData = [
    {
      id: 1,
      klient: 'Jan Kowalski',
      dataPodpisania: '2025-05-08',
      handlowiec: 'Bartek Test',
      sprzedaneProdukty: ['Fotowoltaika', 'Pompa Ciepła'],
      opisUmowyBOK: 'Klient zainteresowany instalacją fotowoltaiczną na dachu, wymaga konsultacji technicznej i wyceny. Planowana realizacja w czerwcu.',
      status: 'Dodana',
    },
    {
      id: 2,
      klient: 'Firma XYZ',
      dataPodpisania: '2025-05-07',
      handlowiec: 'Marcin Test',
      sprzedaneProdukty: ['Klimatyzacje'],
      opisUmowyBOK: 'Umowa na instalację klimatyzacji w biurze, klient oczekuje szybkiego montażu. Potwierdzono доступность sprzętu.',
      status: 'Sprawdzona',
    },
    {
      id: 3,
      klient: 'Anna Nowak',
      dataPodpisania: '2025-05-06',
      handlowiec: 'Katarzyna Nowak',
      sprzedaneProdukty: ['Magazyn Energii', 'Inne'],
      opisUmowyBOK: 'Klientka wybrała magazyn energii do domu jednorodzinnego, dodatkowe uwagi dotyczące установки.',
      status: 'Zlecona do realizacji',
    },
    {
      id: 4,
      klient: 'Piotr Wiśniewski',
      dataPodpisania: '2025-05-05',
      handlowiec: 'Bartek Test',
      sprzedaneProdukty: ['Magazyn Ciepła'],
      opisUmowyBOK: 'Montaż magazynu ciepła zaplanowany na maj, klient wymaga potwierdzenia terminu.',
      status: 'Umówiony montaż',
    },
  ];

  const [data, setData] = useState(initialData);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <div className="lista-umow">
      <h2>Lista Umów</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('klient')}>
              Klient {sortConfig.key === 'klient' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('dataPodpisania')}>
              Data podpisania umowy {sortConfig.key === 'dataPodpisania' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('handlowiec')}>
              Handlowiec {sortConfig.key === 'handlowiec' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
            </th>
            <th>Sprzedane produkty</th>
            <th>Opis umowy BOK</th>
            <th>Status umowy</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.klient}</td>
              <td>{row.dataPodpisania}</td>
              <td>{row.handlowiec}</td>
              <td>
                {row.sprzedaneProdukty.map((product) => (
                  <span
                    key={product}
                    className={`product-tag product-${product.toLowerCase().replace(' ', '-')}`}
                  >
                    {product}
                  </span>
                ))}
              </td>
              <td>
                <span className="tooltip" title={row.opisUmowyBOK}>
                  {truncateText(row.opisUmowyBOK, 200)}
                </span>
              </td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaUmow;