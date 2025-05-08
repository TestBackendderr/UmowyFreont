import React, { useState } from 'react';
import { useRouter } from 'next/router';

const ListaUmow = () => {
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [editRow, setEditRow] = useState(null);
  const [editedData, setEditedData] = useState({});

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
      opisUmowyBOK: 'Umowa na instalację klimatyzacji w biurze, klient oczekuje szybkiego montażu. Potwierdzono dostępność sprzętu.',
      status: 'Sprawdzona',
    },
    {
      id: 3,
      klient: 'Anna Nowak',
      dataPodpisania: '2025-05-06',
      handlowiec: 'Katarzyna Nowak',
      sprzedaneProdukty: ['Magazyn Energii', 'Inne'],
      opisUmowyBOK: 'Klientka wybrała magazyn energii do domu jednorodzinnego, dodatkowe uwagi dotyczące instalacji.',
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

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

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

  const handleEdit = (row) => {
    setEditRow(row.id);
    setEditedData({ ...row });
  };

  const handleSave = () => {
    setData((prev) =>
      prev.map((item) => (item.id === editRow ? { ...item, ...editedData } : item))
    );
    setEditRow(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (id, status) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <div className="lista-umow">
      <h2>Lista Umów</h2>
      <div className="table-actions">
        <button
          className="action-button"
          onClick={() => router.push('/utworz-umowe')}
          disabled={selectedRows.length === 0}
        >
          Edytuj wybrane
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedRows.length === data.length}
                onChange={(e) =>
                  setSelectedRows(e.target.checked ? data.map((item) => item.id) : [])
                }
              />
            </th>
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
            <tr key={row.id} className={selectedRows.includes(row.id) ? 'selected' : ''}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => handleSelectRow(row.id)}
                />
              </td>
              <td>
                {editRow === row.id ? (
                  <input
                    type="text"
                    name="klient"
                    value={editedData.klient}
                    onChange={handleChange}
                  />
                ) : (
                  row.klient
                )}
              </td>
              <td>
                {editRow === row.id ? (
                  <input
                    type="date"
                    name="dataPodpisania"
                    value={editedData.dataPodpisania}
                    onChange={handleChange}
                  />
                ) : (
                  row.dataPodpisania
                )}
              </td>
              <td>
                {editRow === row.id ? (
                  <input
                    type="text"
                    name="handlowiec"
                    value={editedData.handlowiec}
                    onChange={handleChange}
                  />
                ) : (
                  row.handlowiec
                )}
              </td>
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
                <span
                  className="tooltip"
                  title={row.opisUmowyBOK}
                >
                  {truncateText(row.opisUmowyBOK, 200)}
                </span>
              </td>
              <td>
                {editRow === row.id ? (
                  <select
                    name="status"
                    value={editedData.status}
                    onChange={handleChange}
                  >
                    <option value="Dodana">Dodana</option>
                    <option value="Sprawdzona">Sprawdzona</option>
                    <option value="Zlecona do realizacji">Zlecona do realizacji</option>
                    <option value="Umówiony montaż">Umówiony montaż</option>
                  </select>
                ) : (
                  <select
                    value={row.status}
                    onChange={(e) => handleStatusChange(row.id, e.target.value)}
                  >
                    <option value="Dodana">Dodana</option>
                    <option value="Sprawdzona">Sprawdzona</option>
                    <option value="Zlecona do realizacji">Zlecona do realizacji</option>
                    <option value="Umówiony montaż">Umówiony montaż</option>
                  </select>
                )}
                {editRow === row.id && (
                  <button className="action-button small" onClick={handleSave}>
                    Zapisz
                  </button>
                )}
                {editRow !== row.id && (
                  <button
                    className="action-button small secondary"
                    onClick={() => handleEdit(row)}
                  >
                    Edytuj
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaUmow;