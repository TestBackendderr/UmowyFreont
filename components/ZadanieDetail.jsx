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
    linkedContract: "KK31/12/12",
  },
  {
    id: 2,
    date: "2025-05-23T14:03:00",
    createdBy: "Bartłomiej Klekner ",
    assignedTo: "BOK",
    title: "Zadzwoń do klienta po umowie",
    description: "Skontaktuj się z klientem Jan Kowalski w sprawie podpisanej umowy.",
    status: "Oczekuje",
    linkedContract: "KK32/12/12",
  },
  {
    id: 3,
    date: "2025-05-22T10:00:00",
    createdBy: "SYSTEM",
    assignedTo: "BOK",
    title: "Zadzwoń z ponagleniem płatności",
    description: "Przypomnij klientowi Anna Nowak o zaległej płatności za instalację.",
    status: "Oczekuje",
    linkedContract: "KK33/12/12",
  },
];

const ZadanieDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [task, setTask] = useState(null);
  const [isAccepted, setIsAccepted] = useState(false);
  const [history, setHistory] = useState([]);
  const [assignedPerson, setAssignedPerson] = useState(null);

  useEffect(() => {
    if (id) {
      const foundTask = mockData.find((task) => task.id === parseInt(id));
      setTask(foundTask);

      setHistory([
        {
          action: "Utworzono zadanie",
          date: foundTask.date,
          user: foundTask.createdBy,
        },
        {
          action: "Przyjęto zadanie",
          date: "2025-05-23T14:05:00",
          user: "Jan Kowalski",
        },
        {
          action: "Zakończono zadanie",
          date: "2025-05-23T15:00:00",
          user: "Jan Kowalski",
        },
      ]);
    }
  }, [id]);

  const handleAcceptTask = () => {
    setIsAccepted(true);
    setHistory((prev) => [
      ...prev.filter((entry) => entry.action !== "Przyjęto zadanie"),
      {
        action: "Przyjęto zadanie",
        date: new Date().toISOString(),
        user: user?.name || "Użytkownik",
      },
    ]);
  };

  const handleCompleteTask = () => {
    setTask({ ...task, status: "Zakończona" });
    setHistory((prev) => [
      ...prev.filter((entry) => entry.action !== "Zakończono zadanie"),
      {
        action: "Zakończono zadanie",
        date: new Date().toISOString(),
        user: user?.name || "Użytkownik",
      },
    ]);
  };

  const handleBack = () => {
    router.push("/listazadan");
  };

  const handleViewContract = () => {
    alert(`Przejdź do umowy: ${task.linkedContract}`);
  };

  const handleAssignToSelf = () => {
    setAssignedPerson(user?.name || "Użytkownik");
    setHistory((prev) => [
      ...prev,
      {
        action: "Przypisano zadanie",
        date: new Date().toISOString(),
        user: user?.name || "Użytkownik",
      },
    ]);
  };

  if (!task) {
    return <div>Ładowanie...</div>;
  }

  return (
    <div className="zadanie-detail-container">
      <div className="main-content">
        <div className="user-info">
          <span>USER --- GRUPA</span>
          <span>
            {user?.name || "Dominika"} --- {task.assignedTo}
          </span>
        </div>
        <h1>{task.title}</h1>
        <div className="zadanie-detail">
          <div className="biuro2-left">
            <div className="biuro2-content">
              <div className="biuro2-section">
                <table>
                  <thead>
                    <tr>
                      <th>Data na Kiedy</th>
                      <th>Utworzone przez</th>
                      <th>Odpowiedzialny</th>
                      <th>Tytuł</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {new Date(task.date).toLocaleString("pl-PL", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </td>
                      <td>{task.createdBy}</td>
                      <td>{task.assignedTo}</td>
                      <td>{task.title}</td>
                      <td>
                        <span className={`product-tag status-${task.status.toLowerCase()}`}>
                          {task.status}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
                      Idź do umowy (klik do źródła umowy)
                    </button>
                  </div>
                </div>
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
              {history.map((entry, index) => (
                <div key={index} className="task-item">
                  <div className="task-title">{entry.action}</div>
                  <div className="task-meta">
                    <span>
                      {new Date(entry.date).toLocaleString("pl-PL", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </span>
                    <span>{entry.user}</span>
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