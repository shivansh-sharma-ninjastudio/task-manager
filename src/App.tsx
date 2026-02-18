import { ModeToggle } from "./components/mode-toggle";
import { Button } from "./components/ui/button";
import { useGetAllTasks } from "./hooks/tasks/useGetAllTasks";
import { useDeleteTask } from "./hooks/tasks/useDeleteTask";
import { AddEditTask } from "./components/AddEditTask";
import { Task } from "./components/Task";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./components/ui/dialog";
import type { TaskDB, Task as TaskType } from "./types";

function App() {
  const { tasks: tasksFromDb, loading, error } = useGetAllTasks();
  const { deleteTask, loading: deleteLoading } = useDeleteTask();

  const [tasks, setTasks] = useState<TaskDB>([]);
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskType | undefined>(
    undefined,
  );

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

  const handleEdit = (id: string) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    if (taskToEdit) {
      setEditingTask(taskToEdit);
      setOpen(true);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setEditingTask(undefined);
    }
  };

  return (
    <div className="flex w-full items-center justify-center flex-col gap-2 p-10 min-h-screen">
      <ModeToggle />
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">Add Task</Button>
        </DialogTrigger>
        <DialogContent>
          <AddEditTask
            task={editingTask}
            onTaskAdded={(newTask) => {
              setTasks((prev) => [...prev, newTask]);
              setOpen(false);
            }}
            onTaskUpdated={(updatedTask) => {
              setTasks((prev) =>
                prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
              );
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
            <div key={task.id} className="flex gap-2 items-start w-full">
              <Task
                id={task.id}
                title={task.title}
                description={task.description}
                priority={task.priority}
                status={task.status}
                createdAt={task.createdAt}
                dueDate={task.dueDate}
                onDelete={handleDelete}
                onEdit={handleEdit}
                isDeleting={
                  deleteLoading.isDeleting && deleteLoading.id === task.id
                }
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
