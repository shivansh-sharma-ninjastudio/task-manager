import { ModeToggle } from "./components/mode-toggle";
import { useGetAllTasks } from "./hooks/tasks/useGetAllTasks";

function App() {
  const { tasks, loading, error } = useGetAllTasks();
  return (
    <div className="flex h-screen w-full items-center justify-center flex-col gap-2">
      <ModeToggle />
      {error && <p>Error: {error}</p>}
      {loading && <p>Loading...</p>}
      <div className="flex flex-col gap-2">
        {tasks &&
          tasks.map((task) => (
            <a
              className="text-2xl p-4 bg-gray-200 dark:bg-gray-800 rounded-md hover:underline"
              key={task.id}
              href={`/task/${task.id}`}
            >
              {task.title}
            </a>
          ))}
      </div>
    </div>
  );
}

export default App;
