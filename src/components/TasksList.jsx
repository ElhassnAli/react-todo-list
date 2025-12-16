export default function TasksList({
  tasks,
  onSetTasks,
  onDeleteTask,
  showAll,
  showActive,
  showDone,
  filter,
  querySearch,
  onQuerySearch,
  onEditTask,
}) {
  return (
    <section className="list-card">
      <Header onQuerySearch={onQuerySearch} querySearch={querySearch} />
      <AllTasks
        tasks={tasks}
        onSetTasks={onSetTasks}
        onDeleteTask={onDeleteTask}
        onEditTask={onEditTask}
      />
      {tasks.length === 0 && <Empty />}
      <Footer
        showAll={showAll}
        showActive={showActive}
        showDone={showDone}
        filter={filter}
      />
    </section>
  );
}
function Header({ querySearch, onQuerySearch }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 id="list-title" style={{ margin: 0 }}>
        Your Tasks
      </h2>
      <div className="controls">
        <input
          className="search"
          placeholder="Search tasks"
          value={querySearch}
          onChange={(e) => onQuerySearch(e.target.value)}
        />
      </div>
    </div>
  );
}
function AllTasks({ tasks, onSetTasks, onDeleteTask, onEditTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <Task
          task={task}
          key={task.id}
          onSetTasks={onSetTasks}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      ))}
    </ul>
  );
}
function Task({ task, onSetTasks, onDeleteTask, onEditTask }) {
  return (
    <li className="item">
      <div className="handle"></div>
      <input
        type="checkbox"
        className="check"
        checked={task.done}
        onChange={() => {
          onSetTasks(task.id);
        }}
      />
      <div className={`title ${task.done ? "done" : ""}`}>{task.name}</div>
      <div className="actions">
        <button className="icon-btn" title={task.date}>
          ❗
        </button>
        <button
          className="icon-btn"
          title="Delete"
          onClick={() => {
            onDeleteTask(task.id);
          }}
        >
          🗑
        </button>
        <button
          style={{ background: "transparent", border: "none" }}
          title="Edit"
          onClick={() => {
            onEditTask(task.id);
          }}
        >
          🖋️
        </button>
      </div>
    </li>
  );
}

function Empty() {
  return (
    <div className="empty" id="empty">
      No tasks yet — add something you care about.
    </div>
  );
}
function Footer({ showAll, showActive, showDone, filter }) {
  return (
    <div className="footer">
      <div>Showing {filter}</div>
      <div>
        <button className="icon-btn" onClick={showAll}>
          All
        </button>
        <button className="icon-btn" onClick={showActive}>
          Active
        </button>
        <button className="icon-btn" onClick={showDone}>
          Done
        </button>
      </div>
    </div>
  );
}
