import React, { useState } from "react";

const mockActiveTasks = {
  1: ["Handlowiec1 kontakt z klientem", "Dzial realizacji przygotowuje material"],
  2: ["Handlowiec2 konsultacja", "Dzial logistyki przygotowuje transport"],
  3: ["Handlowiec3 follow-up", "Dzial realizacji sprawdza instalację"],
};

const mockArchivedTasks = {
  1: [
    "Handlowiec1 kontakt z klientem (zakończono 2025-05-20)",
    "Dzial realizacji przygotowuje material (zakończono 2025-05-21)",
    "Kontrola jakości (zakończono 2025-05-22)",
  ],
  2: [
    "Handlowiec2 konsultacja (zakończono 2025-05-19)",
    "Dzial logistyki przygotowuje transport (zakończono 2025-05-20)",
  ],
  3: [
    "Handlowiec3 follow-up (zakończono 2025-05-18)",
    "Dzial realizacji sprawdza instalację (zakończono 2025-05-19)",
  ],
};


const mockUsersByRole = {
  Handlowiec: ["Handlowiec1", "Handlowiec2", "Handlowiec3"],
  "Dział Realizacji": ["Realizacja1", "Realizacja2"],
  "Dział Logistyki": ["Logistyka1", "Logistyka2"],
  BOK: ["BOK1", "BOK2"],
};

const roles = ["Handlowiec", "Dział Realizacji", "Dział Logistyki", "BOK"];

const UtworzZadanie = ({ umowaId, umowa }) => {
  const [showArchived, setShowArchived] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTask, setNewTask] = useState({
    date: "",
    createdBy: "",
    role: "", 
    assignedTo: "", 
    title: "",
    description: "",
  });
  const [selectedRole, setSelectedRole] = useState(""); 
  const parsedUmowaId = parseInt(umowaId, 10);

  const activeTasks = mockActiveTasks[parsedUmowaId] || [];
  const archivedTasks = mockArchivedTasks[parsedUmowaId] || [];

  const toggleArchived = () => {
    setShowArchived(!showArchived);
  };

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
   
    setSelectedRole("");
    setNewTask((prev) => ({ ...prev, role: "", assignedTo: "" }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
    if (name === "role") {
      setSelectedRole(value); 
      setNewTask((prev) => ({ ...prev, assignedTo: "" })); 
    }
  };

  const handleAcceptTask = () => {
    if (
      newTask.date &&
      newTask.createdBy &&
      newTask.role &&
      newTask.title &&
      newTask.description
    ) {
      const taskText = `${newTask.title} (dodano ${new Date().toLocaleString(
        "pl-PL",
        { dateStyle: "short", timeStyle: "short" }
      )}${newTask.assignedTo ? `, przypisano: ${newTask.assignedTo}` : ", przypisano do roli: " + newTask.role})`;
      mockActiveTasks[parsedUmowaId] = [
        ...(mockActiveTasks[parsedUmowaId] || []),
        taskText,
      ];
      setNewTask({
        date: "",
        createdBy: "",
        role: "",
        assignedTo: "",
        title: "",
        description: "",
      });
      setSelectedRole("");
      setShowCreateForm(false);
    } else {
      alert("Wypełnij wszystkie pola!");
    }
  };

  return (
    <div className="biuro2-section utwiedz-zadanie">
      <h3>Lista Zadań dla umowy</h3>
      {activeTasks.length > 0 ? (
        <ul className="task-list">
          {activeTasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      ) : (
        <p>Brak aktywnych zadań dla tej umowy.</p>
      )}
      <button className="status-save-button" onClick={toggleArchived}>
        {showArchived ? "Ukryj archiwum" : "Zobacz archiw"}
      </button>
      {showArchived && archivedTasks.length > 0 && (
        <div className="archived-tasks">
          <h4>Archiwum zadań</h4>
          <ul className="task-list">
            {archivedTasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>
      )}
      {showArchived && archivedTasks.length === 0 && (
        <p>Brak zadań w archiwum dla tej umowy.</p>
      )}
      <button className="status-save-button create-task-button" onClick={toggleCreateForm}>
        Stwórz zadanie
      </button>
      {showCreateForm && (
        <div className="task-creation-form">
          <div className="form-group">
            <label>Wybierz rolę:</label>
            <select name="role" value={newTask.role} onChange={handleInputChange}>
              <option value="">Wybierz rolę</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          {newTask.role && (
            <div className="form-group">
              <label>Odpowiedzialny (opcjonalne):</label>
              <select name="assignedTo" value={newTask.assignedTo} onChange={handleInputChange}>
                <option value="">Wszyscy z roli (wybiorą sami)</option>
                {mockUsersByRole[newTask.role].map((user) => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="form-group">
            <label>Na kiedy:</label>
            <input
              type="datetime-local"
              name="date"
              value={newTask.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Utworzone przez:</label>
            <input
              type="text"
              name="createdBy"
              value={newTask.createdBy}
              onChange={handleInputChange}
              placeholder="Wpisz nazwisko"
            />
          </div>
          <div className="form-group">
            <label>Tytuł:</label>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              placeholder="Wpisz tytuł"
            />
          </div>
          <div className="form-group">
            <label>Opis zadania:</label>
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              placeholder="Wpisz opis"
            />
          </div>
          <button className="status-save-button" onClick={handleAcceptTask}>
            Akceptuj zadanie
          </button>
        </div>
      )}
    </div>
  );
};

export default UtworzZadanie;