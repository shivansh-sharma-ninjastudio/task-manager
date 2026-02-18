import { useState } from "react";
import type { EditTaskPayload, Task, TaskDB } from "@/types";
import { getFromStorage, setToStorage } from "@/lib/localstorage";
import { STORAGE_KEY } from "@/constants";
import { runAfterDelay } from "@/lib/delay";

export const useEditTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editTask = async (payload: EditTaskPayload): Promise<Task> => {
    setLoading(true);
    setError(null);

    try {
      await new Promise<void>((resolve) => {
        runAfterDelay(() => resolve(), 500);
      });

      const tasks: TaskDB = getFromStorage(STORAGE_KEY) || [];
      const index = tasks.findIndex((t) => t.id === payload.id);

      if (index === -1) {
        throw new Error("Task not found");
      }

      const before = tasks.slice(0, index);
      const current = tasks[index];
      const after = tasks.slice(index + 1);

      const updatedTask: Task = {
        ...current,
        ...payload.updates,
      };

      const newTasks: TaskDB = [...before, updatedTask, ...after];

      setToStorage(STORAGE_KEY, newTasks);

      return updatedTask;
    } catch (err) {
      setError("Failed to update task");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { editTask, loading, error };
};
