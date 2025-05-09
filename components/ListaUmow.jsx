import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // путь к вашему контексту
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const ListaUmow = () => {
  const { user, accessToken } = useAuth();
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    const fetchUserContracts = async () => {
      if (!user || !accessToken) return;
      try {
        const response = await axios.get(`${apiUrl}/umowa/user/${user.sub}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch user contracts:", error);
      }
    };

    fetchUserContracts();
  }, [user, accessToken]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <div className="lista-umow">
      <h2>Twoje Umowy</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("imieNazwisko")}>
              Klient{" "}
              {sortConfig.key === "imieNazwisko" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("dataPodpisania")}>
              Data podpisania umowy{" "}
              {sortConfig.key === "dataPodpisania" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("handlowiec")}>
              Handlowiec{" "}
              {sortConfig.key === "handlowiec" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </th>
            <th>Sprzedane produkty</th>
            <th>Uwagi handlowca</th>
            <th>Status umowy</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.imieNazwisko}</td>
              <td>{new Date(row.dataPodpisania).toLocaleDateString()}</td>
              <td>{row.handlowiec}</td>
              <td>
                {row.przedaneProdukty.map((product) => (
                  <span
                    key={product}
                    className={`product-tag product-${product
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {product}
                  </span>
                ))}
              </td>
              <td>
                <span className="tooltip" title={row.uwagiHandlowca}>
                  {truncateText(row.uwagiHandlowca, 200)}
                </span>
              </td>
              <td>(добавлю в базе)</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaUmow;
