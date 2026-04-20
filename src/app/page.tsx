import AddTaskForm from "@/src/components/AddTaskForm";
import TaskList from "@/src/components/TaskList";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Taskboard</h1>
      <div className="flex justify-center">
        <AddTaskForm />
      </div>
      <TaskList />
    </div>
  );
}
