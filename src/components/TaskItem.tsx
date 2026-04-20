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
      className={`touch-none rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition ${isDragging ? "opacity-50 shadow-md" : "hover:shadow-md"}`}
      data-task-id={task.id}
      data-task-status={task.status}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-900">{task.title}</h3>
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => deleteTask(task.id)}
          className="flex h-6 w-6 items-center justify-center rounded text-gray-500 transition hover:bg-red-100 hover:text-red-600"
          aria-label={`Delete ${task.title}`}
        >
          ×
        </button>
      </div>
      <p className="mt-1 text-xs text-gray-500">
        Updated {task.updatedAt.toLocaleDateString()}
      </p>
    </article>
  );
};

export default TaskItem;