"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { Task, TaskStatus } from "@/src/types/task";
import TaskItem from "@/src/components/TaskItem";

type TaskColumnProps = {
  status: TaskStatus;
  title: string;
  tasks: Task[];
};

const TaskColumn = ({ status, title, tasks }: TaskColumnProps) => {
  const columnId = `column-${status}`;
  const { setNodeRef, isOver } = useDroppable({
    id: columnId,
  });

  return (
    <section className="flex min-w-[17.5rem] max-w-[20rem] shrink-0 flex-col rounded-lg border border-gray-200 bg-gray-50/90">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-gray-50/95 px-3 py-2">
        <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
            tasks.length > 0
              ? "bg-green-100 text-green-700"
              : "bg-gray-200/80 text-gray-600"
          }`}
        >
          {tasks.length}
        </span>
      </header>
      <ul
        ref={setNodeRef}
        className={`flex min-h-[10rem] flex-col gap-2 p-3 transition-colors ${isOver ? "bg-blue-100/60" : ""}`}
        data-droppable-for-status={status}
      >
        <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskItem task={task} />
            </li>
          ))}
        </SortableContext>
      </ul>
    </section>
  );
};

export default TaskColumn;