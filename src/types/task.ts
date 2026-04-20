export type TaskStatus = "todo" | "inProgress" | "completed";

export const TASK_COLUMNS: readonly { id: TaskStatus; title: string }[] = [
  { id: "todo", title: "To do" },
  { id: "inProgress", title: "In Progress" },
  { id: "completed", title: "Done" },
];

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
};