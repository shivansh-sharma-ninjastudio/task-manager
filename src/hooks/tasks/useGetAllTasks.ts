import { useEffect, useState } from "react";
import type { TaskDB } from "@/types";
import { getFromStorage, setToStorage } from "@/lib/localstorage";
import { DEMO_DB, STORAGE_KEY } from "@/constants";
import { runAfterDelay } from "@/lib/delay";

export const useGetAllTasks = () => {
  const [tasks, setTasks] = useState<TaskDB>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);

      const existingTasks: TaskDB | null = getFromStorage(STORAGE_KEY);

      runAfterDelay(() => {
        if (!existingTasks || existingTasks.length === 0) {
          setToStorage(STORAGE_KEY, DEMO_DB);
          setTasks(DEMO_DB);
        } else {
          setTasks(existingTasks);
        }
        setLoading(false);
      }, 500);
    } catch {
      setError("Error fetching tasks");
      setLoading(false);
    }
  }, []);

  return { tasks, loading, error };
};
