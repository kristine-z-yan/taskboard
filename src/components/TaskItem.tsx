"use client";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useTaskStore } from "@/src/store/task/task.store";
import type { Task } from "@/src/types/task";

const TaskItem = ({ task }: { task: Task }) => {
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`rounded-md border border-gray-300 bg-white p-3 shadow-sm touch-none ${isDragging ? "opacity-50" : ""}`}
      data-task-id={task.id}
      data-task-status={task.status}
    >
      <h3 className="font-semibold text-gray-900">{task.title}</h3>
      <p className="mt-1 text-xs text-gray-500">
        Updated {task.updatedAt.toLocaleDateString()}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => deleteTask(task.id)}
          className="rounded-md bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default TaskItem;