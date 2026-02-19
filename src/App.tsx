import { useGetAllTasks } from "./hooks/tasks/useGetAllTasks";
import { useDeleteTask } from "./hooks/tasks/useDeleteTask";
import { Task } from "./components/Task";
import { ControlPanel } from "./components/ControlPanel";
import { useEffect, useState, useMemo } from "react";
import type {
  TaskDB,
  Task as TaskType,
  TaskFilters,
  TaskSortConfig,
} from "./types";
import { Card } from "./components/ui/card";
import Stats from "./components/Stats";
import { toast } from "sonner";

const PRIORITY_ORDER = { Low: 0, Medium: 1, High: 2 };

function App() {
  const { tasks: tasksFromDb, loading, error } = useGetAllTasks();
  const { deleteTask, loading: deleteLoading } = useDeleteTask();

  const [tasks, setTasks] = useState<TaskDB>([]);
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskType | undefined>(
    undefined,
  );
  const [filters, setFilters] = useState<TaskFilters>({});
  const [sortConfig, setSortConfig] = useState<TaskSortConfig>({
    field: "createdAt",
    order: "desc",
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (tasksFromDb) {
      setTasks(tasksFromDb);
    }
  }, [tasksFromDb]);

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (filters.priority) {
      result = result.filter((task) => task.priority === filters.priority);
    }

    if (filters.status) {
      result = result.filter((task) => task.status === filters.status);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.description && t.description.toLowerCase().includes(q)),
      );
    }

    result.sort((a, b) => {
      let comparison = 0;

      if (sortConfig.field === "priority") {
        comparison = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      } else {
        comparison =
          new Date(a[sortConfig.field]).getTime() -
          new Date(b[sortConfig.field]).getTime();
      }

      return sortConfig.order === "asc" ? comparison : -comparison;
    });

    return result;
  }, [tasks, filters, sortConfig, searchQuery]);

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
      toast("Task deleted succesfully");
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

  const handleClearFilters = () => {
    setFilters({});
    setSortConfig({ field: "createdAt", order: "desc" });
    setSearchQuery("");
  };

  return (
    <div>
      <div className="flex w-full max-w-[1200px] mt-20 items-center justify-center flex-col gap-2 p-4 md:p-10 mx-auto">
        <Stats tasks={tasks} />
        <ControlPanel
          filters={filters}
          sortConfig={sortConfig}
          onFiltersChange={setFilters}
          onSortChange={setSortConfig}
          onSearchChange={setSearchQuery}
          open={open}
          onOpenChange={handleOpenChange}
          editingTask={editingTask}
          onClearFilters={handleClearFilters}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mx-auto justify-items-center">
          {loading &&
            [0, 1, 2].map((i) => (
              <Card key={i} className="h-[200px] w-full"></Card>
            ))}

          {filteredTasks &&
            filteredTasks.map((task) => (
              <Task
                key={task.id}
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
            ))}
        </div>
        {filteredTasks.length === 0 && !loading && (
          <Card className="w-full max-w-[1200px] mx-auto justify-items-center">
            <p className="text-center">No tasks found</p>
          </Card>
        )}
        {error && (
          <Card className="w-full max-w-[1200px] mx-auto justify-items-center">
            <p className="text-center">Error: {error}</p>
          </Card>
        )}
      </div>
    </div>
  );
}

export default App;
