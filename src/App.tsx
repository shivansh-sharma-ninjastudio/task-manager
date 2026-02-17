import { ModeToggle } from "./components/mode-toggle";
import { Button } from "./components/ui/button";
import { useGetAllTasks } from "./hooks/tasks/useGetAllTasks";
import { useDeleteTask } from "./hooks/tasks/useDeleteTask";
import { AddTask } from "./components/AddTask";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./components/ui/dialog";
import type { TaskDB } from "./types";

function App() {
  const { tasks: tasksFromDb, loading, error } = useGetAllTasks();
  const { deleteTask, loading: deleteLoading } = useDeleteTask();

  const [tasks, setTasks] = useState<TaskDB>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (tasksFromDb) {
      setTasks(tasksFromDb);
    }
  }, [tasksFromDb]);

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div className="flex w-full items-center justify-center flex-col gap-2 p-10 min-h-screen">
      <ModeToggle />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button>Add Task</Button>
        </DialogTrigger>
        <DialogContent>
          <AddTask
            onTaskAdded={(newTask) => {
              setTasks((prev) => [...prev, newTask]);
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>

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
                disabled={deleteLoading.isDeleting}
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
