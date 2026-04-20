"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState, type SyntheticEvent } from "react";
import { useTaskStore } from "@/src/store/task/task.store";
import type { Task, TaskStatus } from "@/src/types/task";
import TaskItem from "@/src/components/TaskItem";

type TaskColumnProps = {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  canRemove?: boolean;
  onRemove?: (columnId: TaskStatus) => void;
};

const TaskColumn = ({ status, title, tasks, canRemove = false, onRemove }: TaskColumnProps) => {
  const addTask = useTaskStore((state) => state.addTask);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const columnId = `column-${status}`;
  const { setNodeRef, isOver } = useDroppable({
    id: columnId,
  });

  const handleAddTask = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTaskTitle = newTaskTitle.trim();
    if (!trimmedTaskTitle) return;
    addTask(trimmedTaskTitle, status);
    setNewTaskTitle("");
    setIsAddingTask(false);
  };

  return (
    <section className="flex min-h-[13rem] min-w-[17.5rem] max-w-[20rem] shrink-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-gray-50 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
              tasks.length > 0
                ? "bg-green-100 text-green-700"
                : "bg-gray-200/80 text-gray-600"
            }`}
          >
            {tasks.length}
          </span>
        </div>
        {canRemove ? (
          <button
            type="button"
            onClick={() => onRemove?.(status)}
            className="flex h-6 w-6 items-center justify-center rounded text-gray-500 transition hover:bg-red-100 hover:text-red-600"
            aria-label={`Remove ${title} column`}
          >
            ×
          </button>
        ) : (
          <span className="h-6 w-6" aria-hidden="true" />
        )}
      </header>
      <ul
        ref={setNodeRef}
        className={`flex min-h-[10rem] flex-col gap-2 p-3 transition-colors ${isOver ? "bg-green-50" : "bg-white"}`}
        data-droppable-for-status={status}
      >
        <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskItem task={task} />
            </li>
          ))}
          <li>
            {isAddingTask ? (
              <form onSubmit={handleAddTask} className="space-y-2">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Task title"
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-green-500"
                  autoFocus
                  required
                />
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setIsAddingTask(true)}
                className="w-full rounded-md border border-dashed border-gray-300 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-600 transition hover:border-green-400 hover:bg-green-50 hover:text-green-700"
              >
                + Add New Task
              </button>
            )}
          </li>
        </SortableContext>
      </ul>
    </section>
  );
};

export default TaskColumn;