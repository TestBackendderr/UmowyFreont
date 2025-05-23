import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

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

const ZadanieDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [task, setTask] = useState(null);
  const [tasks, setTasks] = useState(mockData);
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    if (id) {
      const foundTask = mockData.find((task) => task.id === parseInt(id));
      setTask(foundTask);
    }
  }, [id]);

  const handleAcceptTask = () => {
    setIsAccepted(true);
  };

  const handleCompleteTask = () => {
    setTask({ ...task, status: "Zakończona" });
    setTasks(
      tasks.map((t) =>
        t.id === task.id ? { ...t, status: "Zakończona" } : t
      )
    );
  };

  const handleRowClick = (taskId) => {
    router.push(`/zadanie/${taskId}`);
  };

  if (!task) {
    return <div>Ładowanie...</div>;
  }

  return (
    <div className="zadanie-detail-container">
      <div className="main-content">
        <h1>{task.title}</h1>
        <div className="zadanie-detail">
          <div className="biuro2-left">
            <div className="biuro2-content">
              <div className="biuro2-section">
                <h3>Szczegóły Zadania</h3>
                <p>
                  <strong>Data utworzenia:</strong>{" "}
                  {new Date(task.date).toLocaleString("pl-PL", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </p>
                <p>
                  <strong>Utworzone przez:</strong> {task.createdBy}
                </p>
                <p>
                  <strong>Odpowiedzialny:</strong> {task.assignedTo}
                </p>
                <p>
                  <strong>Opis:</strong> {task.description}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`product-tag status-${task.status.toLowerCase()}`}>
                    {task.status}
                  </span>
                </p>
              </div>
            </div>
            <div className="task-actions">
              {!isAccepted ? (
                <button className="status-save-button" onClick={handleAcceptTask}>
                  Przyjmij zadanie
                </button>
              ) : task.status !== "Zakończona" ? (
                <button className="status-save-button" onClick={handleCompleteTask}>
                  Zaliczone zadanie
                </button>
              ) : null}
            </div>
          </div>
          <aside className="historia task-list-sidebar">
            <h2>Wszystkie zadania</h2>
            <div className="task-list">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className={`task-item ${t.id === task.id ? "active" : ""}`}
                  onClick={() => handleRowClick(t.id)}
                >
                  <div className="task-title">{t.title}</div>
                  <div className="task-meta">
                    <span>
                      {new Date(t.date).toLocaleString("pl-PL", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </span>
                    <span
                      className={`product-tag status-${t.status.toLowerCase()}`}
                    >
                      {t.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ZadanieDetail;