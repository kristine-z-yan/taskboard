import { DEFAULT_TASK_COLUMNS, MAX_COLUMNS, Task, TaskStatus } from "@/src/types/task";
import { TaskStore } from "./task.types";
import { create } from "zustand";

const toColumnId = (title: string) =>
  title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const DEFAULT_COLUMN_ID_SET = new Set(DEFAULT_TASK_COLUMNS.map((column) => column.id));

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  columns: [...DEFAULT_TASK_COLUMNS],
  addTask: (title: string, status: TaskStatus) =>
    set((state) => {
      const trimmedTitle = title.trim();
      if (!trimmedTitle) return state;
      if (!state.columns.some((column) => column.id === status)) return state;

      const newTask: Task = {
        id: crypto.randomUUID(),
        title: trimmedTitle,
        status,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return { tasks: [...state.tasks, newTask] };
    }),
  addColumn: (title: string) =>
    set((state) => {
      if (state.columns.length >= MAX_COLUMNS) return state;

      const trimmedTitle = title.trim();
      if (!trimmedTitle) return state;

      const baseId = toColumnId(trimmedTitle);
      if (!baseId) return state;

      let candidateId = baseId;
      let suffix = 1;
      const existingIds = new Set(state.columns.map((column) => column.id));

      while (existingIds.has(candidateId)) {
        suffix += 1;
        candidateId = `${baseId}-${suffix}`;
      }

      return {
        columns: [...state.columns, { id: candidateId, title: trimmedTitle }],
      };
    }),
  removeColumn: (columnId: TaskStatus) =>
    set((state) => {
      if (DEFAULT_COLUMN_ID_SET.has(columnId)) return state;

      const nextColumns = state.columns.filter((column) => column.id !== columnId);
      if (nextColumns.length === state.columns.length) return state;

      return {
        columns: nextColumns,
        tasks: state.tasks.filter((task) => task.status !== columnId),
      };
    }),
  deleteTask: (id: string) =>
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
  updateTaskStatus: (id: string, status: TaskStatus) =>
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, status, updatedAt: new Date() };
        }

        return task;
      }),
    })),
}));