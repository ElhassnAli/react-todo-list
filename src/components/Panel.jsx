import { useState } from "react";

export default function Panel({ tasks, onSetTasks, onClear }) {
  return (
    <section className="flex min-h-[220px] flex-col gap-3 rounded-[16px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] p-4 md:p-5">
      <Brand />
      <InputRow tasks={tasks} onSetTasks={onSetTasks} />
      <Stats tasks={tasks} onClear={onClear} />
    </section>
  );
}
function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-14 w-14 place-items-center rounded-[14px] bg-gradient-to-br from-violet-600 to-cyan-500 text-lg font-bold shadow-[0_6px_18px_rgba(8,10,35,0.6)]">
        TD
      </div>
      <div>
        <h1 id="panel-title" className="m-0 text-lg font-semibold sm:text-xl">
          Daily Focus
        </h1>
        <p className="m-0 text-[13px] text-white/65">
          Beautifully simple tasks — stay focused.
        </p>
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
    const task = {
      id: Date.now(),
      name: value,
      date: date,
      done: false,
    };
    onSetTasks([...tasks, task]);
    setValue("");
  }

  return (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
      <input
        className="w-full rounded-[12px] border border-white/10 bg-transparent px-3.5 py-3 text-sm text-inherit outline-none shadow-[inset_0_-6px_18px_rgba(0,0,0,0.35)] transition-transform duration-150 focus:-translate-y-0.5 focus:shadow-glow sm:flex-1"
        placeholder="Add a new task and press Enter"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handelInput();
        }}
      />
      <button
        className="w-full rounded-[12px] border-none bg-gradient-to-b from-violet-600 to-cyan-500 px-3.5 py-2.5 font-semibold text-white shadow-[0_8px_24px_rgba(12,10,40,0.6)] transition-transform duration-150 active:translate-y-px active:scale-[0.995] sm:min-w-[86px] sm:w-auto"
        onClick={handelInput}
      >
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
      <div className="flex flex-wrap items-center gap-2 text-[13px] text-white/65">
        <div className="rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] px-2.5 py-2">
          {tasksLength} tasks
        </div>
        <div className="rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] px-2.5 py-2">
          {tasksLength - tasksDone.length} Remaining
        </div>
        <div className="flex-1"></div>
        <div
          className="cursor-pointer rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] px-2.5 py-2"
          onClick={onClear}
        >
          Clear All
        </div>
      </div>
      <div className="flex-1"></div>

      <div className="text-[12px] text-white/65">
        Tip: press <strong>Enter</strong> to add
      </div>
    </>
  );
}
