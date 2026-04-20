import { Task, TaskColumn, TaskStatus } from "@/src/types/task";

export type TaskStore = {
  tasks: Task[];
  columns: TaskColumn[];
  addTask: (title: string, status: TaskStatus) => void;
  addColumn: (title: string) => void;
  removeColumn: (columnId: TaskStatus) => void;
  deleteTask: (id: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
}