import { useEffect, useState } from "react";
import type { Task, TaskDB } from "@/types";
import { getFromStorage } from "@/lib/localstorage";
import { runAfterDelay } from "@/lib/delay";
import { STORAGE_KEY } from "@/constants";

export const useGetTask = ({ id }: { id: string }) => {
  const [taskDetails, setTaskDetails] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Task ID is required");
      return;
    }

    try {
      setLoading(true);

      const tasks: TaskDB | null = getFromStorage(STORAGE_KEY);

      if (!tasks) {
        setError("Local storage is empty!");
        return;
      }

      const task = tasks.find((task) => task.id === id);

      runAfterDelay(() => {
        if (!task) {
          setError("Task not found");
        } else {
          setTaskDetails(task);
        }
        setLoading(false);
      }, 500);
    } catch {
      setError("Error fetching task");
      setLoading(false);
    }
  }, []);

  return { taskDetails, loading, error };
};
