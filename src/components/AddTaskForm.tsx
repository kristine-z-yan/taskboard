"use client";
import { useTaskStore } from "@/src/store/task/task.store";
import { useState, type SyntheticEvent } from "react";
import { TaskStatus } from "../types/task";

const AddTaskForm = () => {
  const [title, setTitle] = useState("");
  const columns = useTaskStore((state) => state.columns);
  const [status, setStatus] = useState<TaskStatus>("todo");
  const addTask = useTaskStore((state) => state.addTask);
  const selectedStatus = columns.some((column) => column.id === status)
    ? status
    : (columns[0]?.id ?? "");

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    addTask(trimmedTitle, selectedStatus);
    setTitle("");
  };

  return (
    <div className="flex gap-2 my-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Enter a new task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-2"
        />
        <select
          name="status"
          id="status"
          value={selectedStatus}
          className="border border-gray-300 rounded-md p-2 pr-6"
          disabled={columns.length === 0}
          onChange={(e) => setStatus(e.target.value)}
        >
          {columns.map((column) => (
            <option key={column.id} value={column.id}>
              {column.title}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-green-500 text-white rounded-md py-2 px-4"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
