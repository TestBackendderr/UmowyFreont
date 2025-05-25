import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import MainLayout from "@/components/layouts/MainLayout";
import withAuth from "@/utils/withAuth";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const statusDisplayMap = {
  Oczekuje: "Oczekuje",
  WTrakcie: "W trakcie",
  Zakonczona: "Zakończona",
  Anulowana: "Anulowana",
  Archived: "Archiwizowana",
};

const ListaZadan = () => {
  const { user, accessToken } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!accessToken || !user) {
        setError("Brak autoryzacji");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/tasks/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Błąd podczas pobierania zadań");
        }

        const data = await response.json();
        setTasks(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [accessToken, user]);

  const handleRowClick = (id) => {
    router.push(`/zadanie/${id}`);
  };

  const handleSort = (criteria) => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (criteria === "date") {
        return sortOrder === "asc"
          ? new Date(a.dueDate) - new Date(b.dueDate)
          : new Date(b.dueDate) - new Date(a.dueDate);
      } else if (criteria === "status") {
        return sortOrder === "asc"
          ? (statusDisplayMap[a.status] || a.status).localeCompare(
              statusDisplayMap[b.status] || b.status
            )
          : (statusDisplayMap[b.status] || b.status).localeCompare(
              statusDisplayMap[a.status] || a.status
            );
      }
      return 0;
    });

    setTasks(sortedTasks);
    setSortBy(criteria);
    setSortOrder(sortBy === criteria && sortOrder === "asc" ? "desc" : "asc");
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="listaZadanContainer">
          <div className="mainContent">
            <h2>Lista Zadań</h2>
            <p>Ładowanie...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="listaZadanContainer">
          <div className="mainContent">
            <h2>Lista Zadań</h2>
            <p>Błąd: {error}</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const filteredTasks = tasks.filter((task) => task.status !== "Archived");

  return (
    <MainLayout>
      <div className="listaZadanContainer">
        <div className="mainContent">
          <h2>Lista Zadań</h2>
          <div className="sortControls">
            <button className="sortButton" onClick={() => handleSort("date")}>
              Sortuj po dacie{" "}
              {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
            </button>
            <button className="sortButton" onClick={() => handleSort("status")}>
              Sortuj po statusie{" "}
              {sortBy === "status" && (sortOrder === "asc" ? "↑" : "↓")}
            </button>
          </div>
          <div className="listaZadanTableWrapper">
            <table className="listaZadanTable">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Utworzone przez</th>
                  <th>Odpowiedzialny</th>
                  <th>Tytuł</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr
                    key={task.id}
                    onClick={() => handleRowClick(task.id)}
                    className="taskRow"
                  >
                    <td data-label="Data">
                      {new Date(task.dueDate).toLocaleString("pl-PL", {
                        dateStyle: "short",
                      })}
                    </td>
                    <td data-label="Utworzone przez">
                      {task.createdBy?.name || "SYSTEM"}
                    </td>
                    <td data-label="Odpowiedzialny">
                      {task.assignedTo?.name || task.role || "Nieprzypisane"}
                    </td>
                    <td data-label="Tytuł">{task.title}</td>
                    <td data-label="Status">
                      <span
                        className={`statusTag status${task.status.replace(
                          /\s/g,
                          ""
                        )}`}
                      >
                        {statusDisplayMap[task.status] || task.status}
                      </span>
                    </td>
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
