import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import Filtr from "./Filtr";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const statusLabels = {
  W_trakcie_realizacji: "W trakcie realizacji",
  Zakonczona: "Zakończona",
  Anulowana: "Anulowana",
  Oczekuje_na_potwierdzenie: "Oczekuje na potwierdzenie",
};

const ListaUmow = () => {
  const { user, accessToken } = useAuth();
  const router = useRouter();

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    client: "",
    dateSort: "",
    product: "",
  });

  useEffect(() => {
    const fetchContracts = async () => {
      if (!user || !accessToken) return;

      try {
        const endpoint =
          user.role === "Biuro_Obslugi"
            ? `${apiUrl}/umowa`
            : `${apiUrl}/umowa/user/${user.sub}`;

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Failed to fetch contracts:", error);
      }
    };

    fetchContracts();
  }, [user, accessToken]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...data];

      if (filters.client) {
        filtered = filtered.filter((row) =>
          row.imieNazwisko.toLowerCase().includes(filters.client.toLowerCase())
        );
      }

      if (filters.product) {
        filtered = filtered.filter((row) =>
          row.przedaneProdukty.some((product) =>
            product.toLowerCase().includes(filters.product.toLowerCase())
          )
        );
      }

      if (filters.dateSort) {
        filtered = filtered.sort((a, b) => {
          const dateA = new Date(a.dataPodpisania);
          const dateB = new Date(b.dataPodpisania);
          return filters.dateSort === "newToOld"
            ? dateB - dateA
            : dateA - dateB;
        });
      }

      setFilteredData(filtered);
    };

    applyFilters();
  }, [filters, data]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const headerTitle =
    user?.role === "Biuro_Obslugi" ? "Wszystkie umowy" : "Twoje Umowy";

  const handleRowClick = (id) => {
    router.push(`/umowa/${id}`);
  };

  return (
    <div className="lista-umow">
      <h2>{headerTitle}</h2>

      <Filtr filters={filters} onFilterChange={handleFilterChange} />
      <table>
        <thead>
          <tr>
            <th>Klient</th>
            <th>Data podpisania umowy</th>
            <th>Handlowiec</th>
            <th>Sprzedane produkty</th>
            <th>Uwagi handlowca</th>
            <th>Status umowy</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr
              key={row.id}
              onClick={() => handleRowClick(row.id)}
              style={{ cursor: "pointer" }}
            >
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
              <td>{statusLabels[row.status] || "Brak statusu"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaUmow;
