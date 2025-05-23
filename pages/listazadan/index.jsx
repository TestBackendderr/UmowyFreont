import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import MainLayout from "@/components/layouts/MainLayout";
import withAuth from "@/utils/withAuth";

const mockData = [
  {
    id: 1,
    date: "2025-05-23T14:03:00",
    createdBy: "SYSTEM",
    assignedTo: "BOK",
    title: "Sprawdź umowę",
    description: "Sprawdź umowę numer 12345 pod kątem zgodności danych klienta.",
    status: "Oczekuje",
  },
  {
    id: 2,
    date: "2025-05-23T14:03:00",
    createdBy: "Bartłomiej Klekner Dominika Niewęgłowska",
    assignedTo: "BOK",
    title: "Zadzwoń do klienta po umowie",
    description: "Skontaktuj się z klientem Jan Kowalski w sprawie podpisanej umowy.",
    status: "Oczekuje",
  },
  {
    id: 3,
    date: "2025-05-22T10:00:00",
    createdBy: "SYSTEM",
    assignedTo: "BOK",
    title: "Zadzwoń z ponagleniem płatności",
    description: "Przypomnij klientowi Anna Nowak o zaległej płatności za instalację.",
    status: "Oczekuje",
  },
];

const ListaZadan = () => {
  const { user, accessToken } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState(mockData);

  const handleRowClick = (id) => {
    router.push(`/zadanie/${id}`);
  };

  return (
    <MainLayout>
      <div className="lista-zadan-container">
        <div className="main-content">
          <h2>Lista Zadań</h2>
          <div className="lista-zadan">
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Utworzone przez</th>
                  <th>Odpowiedzialny</th>
                  <th>Tytuł</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr
                    key={task.id}
                    onClick={() => handleRowClick(task.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <td data-label="Data">
                      {new Date(task.date).toLocaleString("pl-PL", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                    <td data-label="Utworzone przez">{task.createdBy}</td>
                    <td data-label="Odpowiedzialny">{task.assignedTo}</td>
                    <td data-label="Tytuł">{task.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default withAuth(ListaZadan);