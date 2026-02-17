import { useState } from "react";
import type { CreateTaskPayload, Task, TaskDB } from "@/types";
import { getFromStorage, setToStorage } from "@/lib/localstorage";
import { STORAGE_KEY } from "@/constants";
import { runAfterDelay } from "@/lib/delay";

export const useAddTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addTask = async (payload: CreateTaskPayload): Promise<Task> => {
    setLoading(true);
    setError(null);

    try {
      await new Promise<void>((resolve) => {
        runAfterDelay(() => resolve(), 500);
      });

      const existingTasks: TaskDB = getFromStorage(STORAGE_KEY) || [];

      const newTask: Task = {
        id: crypto.randomUUID(),
        title: payload.title,
        description: payload.description,
        priority: payload.priority,
        status: "To Do",
        createdAt: new Date().toISOString(),
        dueDate: payload.dueDate,
      };

      const updatedTasks = [...existingTasks, newTask];
      setToStorage(STORAGE_KEY, updatedTasks);

      return newTask;
    } catch (err) {
      setError("Failed to add task");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addTask, loading, error };
};
