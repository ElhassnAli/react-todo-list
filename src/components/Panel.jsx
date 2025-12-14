import { useState } from "react";

export default function Panel({ tasks, onSetTasks, onClear }) {
  return (
    <section className="panel">
      <Brand />
      <InputRow tasks={tasks} onSetTasks={onSetTasks} />
      <Stats tasks={tasks} onClear={onClear} />
    </section>
  );
}
function Brand() {
  return (
    <div className="brand">
      <div className="logo">TD</div>
      <div>
        <h1 id="panel-title">Daily Focus</h1>
        <p>Beautifully simple tasks — stay focused.</p>
      </div>
    </div>
  );
}
function InputRow({ tasks, onSetTasks }) {
  const [value, setValue] = useState("");

  function handelInput() {
    if (value === "") return;
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const task = {
      id: Date.now(),
      name: value,
      date: `${date} ${time}`,
      done: false,
    };
    onSetTasks([...tasks, task]);
    setValue("");
  }

  return (
    <div className="add-row">
      <input
        className="input"
        placeholder="Add a new task and press Enter"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handelInput();
        }}
      />
      <button className="btn" onClick={handelInput}>
        Add
      </button>
    </div>
  );
}
function Stats({ tasks, onClear }) {
  const tasksLength = tasks.length;
  const tasksDone = tasks.filter((task) => task.done === true);
  return (
    <>
      <div className="stats">
        <div className="chip">{tasksLength} tasks</div>
        <div className="chip">{tasksLength - tasksDone.length} Remaining</div>
        <div style={{ flex: "1" }}></div>
        <div className="chip" style={{ cursor: "pointer" }} onClick={onClear}>
          Clear All
        </div>
      </div>
      <div style={{ flex: "1" }}></div>

      <div style={{ fontSize: "12px", color: "var(--muted)" }}>
        Tip: press <strong>Enter</strong> to add
      </div>
    </>
  );
}
