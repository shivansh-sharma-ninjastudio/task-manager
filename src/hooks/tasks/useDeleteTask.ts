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

  const deleteTask = async (id: string): Promise<void> => {
    if (!id) {
      setError("Task ID is required");
      throw new Error("Task ID is required");
    }

    setLoading({ isDeleting: true, id });

    try {
      const tasks: TaskDB | null = getFromStorage(STORAGE_KEY);

      if (!tasks) {
        setError("Local storage is empty!");
        setLoading({ isDeleting: false, id: null });
        throw new Error("Local storage is empty");
      }

      await new Promise<void>((resolve) => {
        runAfterDelay(() => {
          resolve();
        }, 500);
      });

      const filteredTasks = tasks.filter((task) => task.id !== id);
      setToStorage(STORAGE_KEY, filteredTasks);
      setLoading({ isDeleting: false, id: null });
    } catch (err) {
      setError("Error deleting task");
      setLoading({ isDeleting: false, id: null });
      throw err;
    }
  };

  return { deleteTask, loading, error };
};
