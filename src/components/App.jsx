import { useEffect, useState } from "react";
import Panel from "./Panel";
import TasksList from "./TasksList";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [filter, setFilter] = useState("all");
  const [querySearch, setQuerySearch] = useState("");

  function handleTaskDone(taskId) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  }
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  function handleDeleteTask(taskId) {
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
  }
  function handleEditTask(taskId) {
    const value = prompt("New Name");
    if (value) {
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === taskId ? { ...task, name: value } : task
        )
      );
    }
  }
  function clearAllTasks() {
    if (tasks.length === 0) return;
    const boolean = window.confirm("Are You Sure Want Delete All Tasks");
    if (boolean) {
      setTasks([]);
    }
  }

  function getFilteredTasks() {
    let filtered = tasks;

    // Apply status filter
    switch (filter) {
      case "active":
        filtered = filtered.filter((task) => task.done !== true);
        break;
      case "done":
        filtered = filtered.filter((task) => task.done === true);
        break;
      default:
        break;
    }

    // Apply search filter
    if (querySearch.trim()) {
      filtered = filtered.filter((task) =>
        task.name.toLowerCase().includes(querySearch.toLowerCase())
      );
    }

    return filtered;
  }
  const filteredTasks = getFilteredTasks();

  return (
    <main className="app">
      <Panel tasks={tasks} onSetTasks={setTasks} onClear={clearAllTasks} />
      <TasksList
        tasks={filteredTasks}
        onSetTasks={handleTaskDone}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
        showAll={() => setFilter("all")}
        showActive={() => setFilter("active")}
        showDone={() => setFilter("done")}
        filter={filter}
        querySearch={querySearch}
        onQuerySearch={setQuerySearch}
      />
    </main>
  );
}
