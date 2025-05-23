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

const normalizePrzedaneProdukty = (products) => {
  return products.map((product) => {
    if (typeof product === "string") {
      try {
        return JSON.parse(product);
      } catch {
        return { name: product, details: {} };
      }
    }
    return product;
  });
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

        const normalizedData = response.data.map((umowa) => ({
          ...umowa,
          przedaneProdukty: normalizePrzedaneProdukty(umowa.przedaneProdukty),
        }));

        setData(normalizedData);
        setFilteredData(normalizedData);
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
            product.name.toLowerCase().includes(filters.product.toLowerCase())
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
              <td data-label="Klient">{row.imieNazwisko}</td>
              <td data-label="Data podpisania umowy">
                {new Date(row.dataPodpisania).toLocaleDateString()}
              </td>
              <td data-label="Handlowiec">{row.handlowiec}</td>
              <td data-label="Sprzedane produkty">
                {row.przedaneProdukty.map((product, index) => (
                  <span
                    key={`${product.name}-${index}`}
                    className={`product-tag product-${product.name
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {product.name}
                  </span>
                ))}
              </td>
              <td data-label="Uwagi handlowca">
                <span className="tooltip" title={row.uwagiHandlowca}>
                  {truncateText(row.uwagiHandlowca, 200)}
                </span>
              </td>
              <td data-label="Status umowy">
                {statusLabels[row.status] || "Brak statusu"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaUmow;
