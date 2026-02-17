import { ModeToggle } from "./components/mode-toggle";
import { Button } from "./components/ui/button";
import { useGetAllTasks } from "./hooks/tasks/useGetAllTasks";
import { useDeleteTask } from "./hooks/tasks/useDeleteTask";
import { useEffect, useState } from "react";
import type { TaskDB } from "./types";

function App() {
  const [tasks, setTasks] = useState<TaskDB>([]);

  const { tasks: tasksFromDb, loading, error } = useGetAllTasks();
  const { deleteTask, loading: deleteLoading } = useDeleteTask();

  useEffect(() => {
    if (tasksFromDb) {
      setTasks(tasksFromDb);
    }
  }, [tasksFromDb]);

  const handleDelete = (id: string) => {
    deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="flex h-screen w-full items-center justify-center flex-col gap-2">
      <ModeToggle />
      {error && <p>Error: {error}</p>}
      {loading && <p>Loading...</p>}
      <div className="flex flex-col gap-2">
        {tasks &&
          tasks.map((task) => (
            <>
              <a
                className="text-2xl p-4 bg-gray-200 dark:bg-gray-800 rounded-md hover:underline"
                key={task.id}
                href={`/task/${task.id}`}
              >
                {task.title}
              </a>
              <Button
                variant={"destructive"}
                onClick={() => handleDelete(task.id)}
                className="cursor-pointer"
              >
                {deleteLoading.isDeleting && deleteLoading.id === task.id
                  ? "Deleting..."
                  : "Delete"}
              </Button>
            </>
          ))}
      </div>
    </div>
  );
}

export default App;
