"use client";

import { DndContext, DragEndEvent, PointerSensor, closestCorners, useSensor, useSensors } from "@dnd-kit/core";
import { TASK_COLUMNS } from "@/src/types/task";
import { useTaskStore } from "@/src/store/task/task.store";
import TaskColumn from "@/src/components/TaskColumn";

const TaskList = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeTask = tasks.find((task) => task.id === active.id);
    if (!activeTask) return;

    let targetStatus = activeTask.status;

    if (typeof over.id === "string" && over.id.startsWith("column-")) {
      targetStatus = over.id.replace("column-", "") as typeof activeTask.status;
    } else {
      const overTask = tasks.find((task) => task.id === over.id);
      if (!overTask) return;
      targetStatus = overTask.status;
    }

    if (targetStatus !== activeTask.status) {
      updateTaskStatus(activeTask.id, targetStatus);
    }
  };

  return (
    <div className="mt-6">
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div
          className="flex justify-center gap-4 overflow-x-auto pb-2 pt-1 items-start"
          aria-label="Task board"
        >
          {TASK_COLUMNS.map((column) => (
            <TaskColumn
              key={column.id}
              status={column.id}
              title={column.title}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default TaskList;