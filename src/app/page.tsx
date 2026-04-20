import AddTaskForm from "@/src/components/AddTaskForm";
import TaskList from "@/src/components/TaskList";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-green-600 sm:text-4xl">Taskboard</h1>
        <p className="mt-2 text-sm text-gray-500">Plan, prioritize, and move tasks across your workflow.</p>
      </div>
      <div className="flex justify-center">
        <AddTaskForm />
      </div>
      <TaskList />
    </main>
  );
}
