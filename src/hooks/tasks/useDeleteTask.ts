import { useState } from "react";
import type { TaskDB } from "@/types";
import { getFromStorage, setToStorage } from "@/lib/localstorage";
import { runAfterDelay } from "@/lib/delay";
import { STORAGE_KEY } from "@/constants";

export const useDeleteTask = () => {
  const [loading, setLoading] = useState<{
    isDeleting: boolean;
    id: string | null;
  }>({
    isDeleting: false,
    id: null,
  });
  const [error, setError] = useState<string | null>(null);

  const deleteTask = (id: string) => {
    if (!id) {
      setError("Task ID is required");
      return;
    }

    try {
      setLoading({ isDeleting: true, id });

      const tasks: TaskDB | null = getFromStorage(STORAGE_KEY);

      if (!tasks) {
        setError("Local storage is empty!");
        setLoading({ isDeleting: false, id: null });
        return;
      }

      runAfterDelay(() => {
        const filteredTasks = tasks.filter((task) => task.id !== id);
        setToStorage(STORAGE_KEY, filteredTasks);
        setLoading({ isDeleting: false, id: null });
      }, 500);
    } catch {
      setError("Error deleting task");
      setLoading({ isDeleting: false, id: null });
    }
  };

  return { deleteTask, loading, error };
};
