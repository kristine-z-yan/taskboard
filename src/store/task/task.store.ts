import { Task, TaskStatus } from "@/src/types/task";
import { TaskStore } from "./task.types";
import { create } from "zustand";

export const useTaskStore = create<TaskStore>((set) => ({
tasks: [],
addTask: (title: string, status: TaskStatus) => set((state) => {
  const newTask: Task = {
    id: crypto.randomUUID(),
    title,
    status,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  return { tasks: [...state.tasks, newTask] }
}),
deleteTask: (id: string) =>set(state => ({tasks: state.tasks.filter(task => task.id !== id)})),
updateTaskStatus: (id: string, status: TaskStatus) =>set(state => ({tasks: state.tasks.map(task => {
  if (task.id === id) {
    return { ...task, status, updatedAt: new Date() };
  }
  return task;
})})),
}))