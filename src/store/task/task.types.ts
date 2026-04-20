import { Task, TaskStatus } from "@/src/types/task";

export type TaskStore = {
  tasks: Task[];
  addTask: (title: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
}