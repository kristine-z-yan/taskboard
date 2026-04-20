export type TaskStatus = string;

export type TaskColumn = {
  id: TaskStatus;
  title: string;
};

export const MAX_COLUMNS = 5;

export const DEFAULT_TASK_COLUMNS: readonly TaskColumn[] = [
  { id: "todo", title: "To do" },
  { id: "in-progress", title: "In Progress" },
  { id: "completed", title: "Done" },
];

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
};