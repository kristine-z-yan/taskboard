"use client";

import { DndContext, DragEndEvent, PointerSensor, closestCorners, useSensor, useSensors } from "@dnd-kit/core";
import { useTaskStore } from "@/src/store/task/task.store";
import TaskColumn from "@/src/components/TaskColumn";
import { useMemo, useState, type SyntheticEvent } from "react";
import { DEFAULT_TASK_COLUMNS, MAX_COLUMNS } from "@/src/types/task";

const DEFAULT_COLUMN_ID_SET = new Set(DEFAULT_TASK_COLUMNS.map((column) => column.id));

const TaskList = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const columns = useTaskStore((state) => state.columns);
  const addColumn = useTaskStore((state) => state.addColumn);
  const removeColumn = useTaskStore((state) => state.removeColumn);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const canAddColumn = columns.length < MAX_COLUMNS;
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    })
  );
  const tasksByStatus = useMemo(() => {
    const grouped = new Map<string, typeof tasks>();
    for (const task of tasks) {
      const group = grouped.get(task.status) ?? [];
      group.push(task);
      grouped.set(task.status, group);
    }
    return grouped;
  }, [tasks]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeTask = tasks.find((task) => task.id === active.id);
    if (!activeTask) return;

    let targetStatus = activeTask.status;

    if (typeof over.id === "string" && over.id.startsWith("column-")) {
      targetStatus = over.id.replace("column-", "") as typeof activeTask.status;
    } else {
      const overTask = tasks.find((task) => task.id === over.id);
      if (!overTask) return;
      targetStatus = overTask.status;
    }

    if (targetStatus !== activeTask.status) {
      updateTaskStatus(activeTask.id, targetStatus);
    }
  };

  const handleAddColumn = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTitle = newColumnTitle.trim();
    if (!trimmedTitle) return;
    addColumn(trimmedTitle);
    setNewColumnTitle("");
    setIsAddingColumn(false);
  };

  return (
    <div className="mt-6">
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div
          className="flex items-start justify-center gap-4 overflow-x-auto pb-2 pt-1"
          aria-label="Task board"
        >
          {columns.map((column) => (
            <TaskColumn
              key={column.id}
              status={column.id}
              title={column.title}
              tasks={tasksByStatus.get(column.id) ?? []}
              canRemove={!DEFAULT_COLUMN_ID_SET.has(column.id)}
              onRemove={removeColumn}
            />
          ))}
          {canAddColumn && (
            <section className="flex min-h-[13rem] min-w-[17.5rem] max-w-[20rem] shrink-0 items-center rounded-xl border border-dashed border-green-300 bg-green-50/70">
              {isAddingColumn ? (
                <form onSubmit={handleAddColumn} className="flex h-full min-h-full flex-col justify-center gap-3 p-4">
                  <input
                    type="text"
                    value={newColumnTitle}
                    onChange={(e) => setNewColumnTitle(e.target.value)}
                    placeholder="Column name"
                    className="rounded-md border border-green-300 bg-white p-2 text-sm outline-none transition focus:border-green-500"
                    autoFocus
                    required
                  />
                  <div className="flex w-full gap-2">
                    <button
                      type="submit"
                      className="w-full rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingColumn(false);
                        setNewColumnTitle("");
                      }}
                      className="w-full rounded-md border border-green-300 bg-white px-3 py-2 text-sm text-green-700 transition hover:bg-green-100"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAddingColumn(true)}
                  className="flex w-full flex-1 flex-col items-center justify-center gap-1 self-stretch rounded-xl p-4 text-green-700 transition hover:bg-green-100/80"
                >
                  <span className="text-3xl leading-none">+</span>
                  <span className="text-sm font-medium">Add new column</span>
                </button>
              )}
            </section>
          )}
        </div>
      </DndContext>
    </div>
  );
};

export default TaskList;