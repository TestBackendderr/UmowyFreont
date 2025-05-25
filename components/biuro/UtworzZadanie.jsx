import React, { useState, useEffect } from "react";

const UtworzZadanie = ({ umowaId, umowa }) => {
  const [showArchived, setShowArchived] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [roles, setRoles] = useState([]);
  const [usersByRole, setUsersByRole] = useState([]);
  const [newTask, setNewTask] = useState({
    dueDate: "",
    title: "",
    description: "",
    role: "",
    assignedToId: "",
  });
  const [selectedRole, setSelectedRole] = useState("");
  const [activeTasks, setActiveTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${apiUrl}/tasks/umowa/${umowaId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        const active = data.filter(
          (task) => task.status === "Oczekuje" || task.status === "WTrakcie"
        );
        const archived = data.filter(
          (task) =>
            task.status === "Zakonczona" ||
            task.status === "Anulowana" ||
            task.status === "Archived"
        );

        setActiveTasks(active);
        setArchivedTasks(archived);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    if (umowaId) {
      fetchTasks();
    }
  }, [umowaId, apiUrl, accessToken]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch(`${apiUrl}/user/roles`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();
        setRoles(data);
      } catch (err) {
        console.error("Error fetching roles:", err);
      }
    };
    fetchRoles();
  }, [apiUrl, accessToken]);

  useEffect(() => {
    if (!selectedRole) {
      setUsersByRole([]);
      return;
    }
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${apiUrl}/user/by-role?role=${selectedRole}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();
        setUsersByRole(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, [selectedRole, apiUrl, accessToken]);

  const toggleArchived = () => setShowArchived(!showArchived);

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
    setSelectedRole("");
    setNewTask({
      dueDate: "",
      title: "",
      description: "",
      role: "",
      assignedToId: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
    if (name === "role") {
      setSelectedRole(value);
      setNewTask((prev) => ({ ...prev, assignedToId: "" }));
    }
  };

  const handleAcceptTask = async () => {
    const { dueDate, title, description, role, assignedToId } = newTask;

    if (!dueDate || !title || !description) return;
    if (!assignedToId && !role) return;

    try {
      const body = {
        dueDate,
        title,
        description,
        status: "Oczekuje",
        umowaId: parseInt(umowaId),
      };

      if (assignedToId) {
        body.assignedToId = parseInt(assignedToId);
      } else {
        body.role = role;
      }

      const res = await fetch(`${apiUrl}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error(err.message || "Nie udało się utworzyć zadania");
        return;
      }

      toggleCreateForm();

      const updatedRes = await fetch(`${apiUrl}/tasks/umowa/${umowaId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const updatedData = await updatedRes.json();
      const active = updatedData.filter(
        (task) => task.status === "Oczekuje" || task.status === "WTrakcie"
      );
      const archived = updatedData.filter(
        (task) =>
          task.status === "Zakonczona" ||
          task.status === "Anulowana" ||
          task.status === "Archived"
      );
      setActiveTasks(active);
      setArchivedTasks(archived);
    } catch (err) {
      console.error("Błąd:", err.message);
    }
  };

  const groupTasks = (tasks) => {
    const taskMap = {};

    tasks.forEach((task) => {
      const key = `${task.title}|${task.description}|${task.dueDate}|${
        task.role || ""
      }`;
      if (!taskMap[key]) {
        taskMap[key] = {
          ...task,
          count: 1,
          assignedToIds: new Set([task.assignedToId]),
        };
      } else {
        taskMap[key].count += 1;
        if (task.assignedToId) {
          taskMap[key].assignedToIds.add(task.assignedToId);
        }
      }
    });

    return Object.values(taskMap).map((task) => ({
      ...task,
      isGrouped: task.count > 1 && task.role && task.assignedToIds.size > 1,
    }));
  };

  const groupedActiveTasks = groupTasks(activeTasks);
  const groupedArchivedTasks = groupTasks(archivedTasks);

  return (
    <div className="biuro2-section utwiedz-zadanie">
      <h3>Lista Zadań dla umowy</h3>

      {groupedActiveTasks.length > 0 ? (
        <ul className="task-list">
          {groupedActiveTasks.map((task) => (
            <li key={task.id}>
              {task.title} - {task.description}{" "}
              {task.isGrouped
                ? `(Przypisane do: ${task.role})`
                : task.assignedTo
                ? `(Przypisane do: ${task.assignedTo.name})`
                : task.role
                ? `(Rola: ${task.role})`
                : ""}
            </li>
          ))}
        </ul>
      ) : (
        <p>Brak aktywnych zadań dla tej umowy.</p>
      )}

      <button className="status-save-button" onClick={toggleArchived}>
        {showArchived ? "Ukryj archiwum" : "Zobacz archiwum"}
      </button>

      {showArchived && (
        <div className="archived-tasks">
          <h4>Archiwum zadań</h4>
          {groupedArchivedTasks.length > 0 ? (
            <ul className="task-list">
              {groupedArchivedTasks.map((task) => (
                <li key={task.id}>
                  {task.title} - {task.description}{" "}
                  {task.isGrouped
                    ? `(Przypisane do: ${task.role})`
                    : task.assignedTo
                    ? `(Przypisane do: ${task.assignedTo.name})`
                    : task.role
                    ? `(Przypisane do: ${task.role})`
                    : ""}
                </li>
              ))}
            </ul>
          ) : (
            <p>Brak zadań w archiwum.</p>
          )}
        </div>
      )}

      <button
        className="status-save-button create-task-button"
        onClick={toggleCreateForm}
      >
        Stwórz zadanie
      </button>

      {showCreateForm && (
        <div className="task-creation-form">
          <div className="form-group">
            <label>Rola:</label>
            <select
              name="role"
              value={newTask.role}
              onChange={handleInputChange}
            >
              <option value="">Wybierz rolę</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {selectedRole && (
            <div className="form-group">
              <label>Przypisany użytkownik (opcjonalnie):</label>
              <select
                name="assignedToId"
                value={newTask.assignedToId}
                onChange={handleInputChange}
              >
                <option value="">-- Wszyscy z roli --</option>
                {usersByRole.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label>Na kiedy:</label>
            <input
              type="date"
              name="dueDate"
              value={newTask.dueDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Tytuł:</label>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              placeholder="Tytuł zadania"
            />
          </div>

          <div className="form-group">
            <label>Opis:</label>
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              placeholder="Opis zadania"
            />
          </div>

          <button className="status-save-button" onClick={handleAcceptTask}>
            Zapisz zadanie
          </button>
        </div>
      )}
    </div>
  );
};

export default UtworzZadanie;
