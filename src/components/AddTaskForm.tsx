"use client";
import { useTaskStore } from "@/src/store/task/task.store";
import { useState } from "react";
import { TASK_COLUMNS, TaskStatus } from "../types/task";

const AddTaskForm = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask(title, status as TaskStatus);
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
        <select name="status" id="status" className="border border-gray-300 rounded-md p-2 pr-6" onChange={(e) => setStatus(e.target.value)}>
          {TASK_COLUMNS.map((column: { id: string; title: string }) => (
            <option key={column.id} value={column.id}>{column.title}</option>
          ))}
        </select>
        <button type="submit" className="bg-green-500 text-white rounded-md py-2 px-4">Add Task</button>
      </form>
    </div>
  );
};

export default AddTaskForm;
