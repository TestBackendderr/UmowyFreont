import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const statusDisplayMap = {
  Oczekuje: "Oczekuje",
  WTrakcie: "W trakcie",
  Zakonczona: "Zakończona",
  Anulowana: "Anulowana",
  Archived: "Archiwizowana",
};

const ZadanieDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user, accessToken } = useAuth();
  const [task, setTask] = useState(null);
  const [isAccepted, setIsAccepted] = useState(false);
  const [assignedPerson, setAssignedPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      if (!router.isReady || !id || !accessToken || !user) {
        if (!router.isReady) return;
        setError("Brak autoryzacji lub ID zadania");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/tasks/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Błąd podczas pobierania danych zadania");
        }

        const data = await response.json();
        setTask(data);
        setAssignedPerson(data.assignedTo?.name || null);
        setIsAccepted(
          data.status === "WTrakcie" || data.status === "Zakonczona"
        );
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, accessToken, user, router.isReady]);

  const handleAcceptTask = async () => {
    try {
      const response = await fetch(`${apiUrl}/tasks/${id}/assign`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Błąd podczas przyjmowania zadania");
      }

      const updatedTask = await response.json();
      setTask(updatedTask);
      setIsAccepted(true);
      setAssignedPerson(user?.name || "Użytkownik");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCompleteTask = async () => {
    try {
      const response = await fetch(`${apiUrl}/tasks/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Zakonczona" }),
      });

      if (!response.ok) {
        throw new Error("Błąd podczas kończenia zadania");
      }

      const updatedTask = await response.json();
      setTask(updatedTask);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleBack = () => {
    router.push("/listazadan");
  };

  const handleViewContract = () => {
    if (task && task.umowa && task.umowa.id) {
      router.push(`/umowa/${task.umowa.id}`);
    } else {
      alert("Brak powiązanej umowy");
    }
  };

  const handleAssignToSelf = async () => {
    try {
      const response = await fetch(`${apiUrl}/tasks/${id}/assign`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Błąd podczas przypisywania zadania");
      }

      const updatedTask = await response.json();
      setTask(updatedTask);
      setAssignedPerson(user?.name || "Użytkownik");
      setIsAccepted(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Ładowanie...</div>;
  if (error) return <div>Błąd: {error}</div>;
  if (!task) return <div>Zadanie nie znalezione</div>;

  return (
    <div className="zadanie-detail-container">
      <div className="main-content">
        <h1>{task.title}</h1>
        <div className="zadanie-detail">
          <div className="biuro2-left">
            <div className="biuro2-content">
              <div className="biuro2-section">
                <div className="task-info-grid">
                  <div className="info-item">
                    <span className="info-label">Data na Kiedy:</span>
                    <span className="info-value">
                      {new Date(task.dueDate).toLocaleString("pl-PL", {
                        dateStyle: "short",
                      })}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Utworzone przez:</span>
                    <span className="info-value">{task.createdBy?.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Odpowiedzialny:</span>
                    <span className="info-value">
                      {task.assignedTo?.name || task.role}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Tytuł:</span>
                    <span className="info-value">{task.title}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Status:</span>
                    <span
                      className={`status-tag status-${task.status.toLowerCase()}`}
                    >
                      {statusDisplayMap[task.status] || task.status}
                    </span>
                  </div>
                </div>
                <div className="task-components">
                  <div className="component-section assigned-section">
                    <h3>Osoby przypisane do zadania</h3>
                    {assignedPerson ? (
                      <p>{assignedPerson}</p>
                    ) : (
                      <>
                        <p>BRAK</p>
                        <button
                          className="assign-button"
                          onClick={handleAssignToSelf}
                        >
                          Kliknij i przypisz na siebie
                        </button>
                      </>
                    )}
                  </div>
                  <div className="component-section">
                    <h3>Treść zadania</h3>
                    <p>{task.description}</p>
                  </div>
                  <div className="component-section">
                    <h3>Opis zadania</h3>
                    <p>{task.description}</p>
                  </div>
                  <div className="component-section">
                    <h3>Link na umowę</h3>
                    <button
                      className="status-save-button contract-link"
                      onClick={handleViewContract}
                    >
                      Idź do umowy
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="task-actions">
              {!isAccepted ? (
                <button
                  className="status-save-button"
                  onClick={handleAcceptTask}
                >
                  Przyjmij zadanie
                </button>
              ) : task.status !== "Zakonczona" ? (
                <button
                  className="status-save-button"
                  onClick={handleCompleteTask}
                >
                  Zakończ zadanie
                </button>
              ) : (
                <button className="status-save-button" disabled>
                  Zadanie zakończone
                </button>
              )}
              <button
                className="status-save-button back-button"
                onClick={handleBack}
              >
                Powrót do listy
              </button>
            </div>
          </div>
          <aside className="historia task-list-sidebar">
            <h2>Historia Zadania</h2>
            <div className="task-list">
              {task.history && task.history.length > 0 ? (
                task.history.map((entry, index) => {
                  const parts = entry.split(": ");
                  const action = parts[0];
                  const rawDate = parts[1];
                  const date = new Date(rawDate);

                  return (
                    <div key={index} className="task-item">
                      <div className="task-title">{action}</div>
                      <div className="task-meta">
                        <span>
                          {date.toLocaleString("pl-PL", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>Brak historii dla tego zadania.</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ZadanieDetail;
