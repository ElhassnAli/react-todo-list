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
    <section className="flex min-h-[320px] flex-col gap-3 rounded-[16px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] p-3 md:p-5">
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
    <div className="flex items-center justify-between">
      <h2 id="list-title" className="m-0 text-lg font-semibold sm:text-xl">
        Your Tasks
      </h2>
      <div className="flex items-center gap-2.5">
        <input
          className="w-full rounded-[10px] border border-white/10 bg-transparent px-3 py-2.5 text-inherit outline-none sm:min-w-[180px]"
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
    <ul className="m-0 flex w-full max-w-full flex-col gap-2.5 overflow-auto p-0">
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
    <li className="flex flex-wrap items-center gap-2 rounded-[12px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),rgba(255,255,255,0.01))] p-2 transition-transform duration-150 hover:-translate-y-0.5 sm:gap-3 sm:p-[6px]">
      <div className="h-8 w-2 rounded-full bg-gradient-to-b from-cyan-500 to-violet-600 sm:h-9"></div>
      <input
        type="checkbox"
        className="grid h-5 w-5 place-items-center cursor-pointer accent-[#07ff30]"
        checked={task.done}
        onChange={() => {
          onSetTasks(task.id);
        }}
      />
      <div
        className={`flex-1 text-sm ${task.done ? "text-white/50 line-through" : ""}`}
      >
        {task.name}
      </div>
      <div className="text-[12px] text-white/65">{task.date}</div>
      <div className="flex gap-0.5">
        <button
          className="rounded-lg border-none bg-transparent p-2 text-white/65 hover:bg-white/10"
          title="Delete"
          onClick={() => {
            onDeleteTask(task.id);
          }}
        >
          🗑
        </button>
        <button
          className="rounded-lg border-none bg-transparent p-2 text-white/65 hover:bg-white/10"
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
    <div
      className="grid place-items-center px-9 py-2.5 text-[15px] text-white/65"
      id="empty"
    >
      No tasks yet — add something you care about.
    </div>
  );
}
function Footer({ showAll, showActive, showDone, filter }) {
  return (
    <div className="flex flex-col gap-2 border-t border-white/10 pt-2 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
      <div>Showing {filter}</div>
      <div>
        <button
          className="rounded-lg border-none bg-transparent p-2 text-white/65 hover:bg-white/10"
          onClick={showAll}
        >
          All
        </button>
        <button
          className="rounded-lg border-none bg-transparent p-2 text-white/65 hover:bg-white/10"
          onClick={showActive}
        >
          Active
        </button>
        <button
          className="rounded-lg border-none bg-transparent p-2 text-white/65 hover:bg-white/10"
          onClick={showDone}
        >
          Done
        </button>
      </div>
    </div>
  );
}
