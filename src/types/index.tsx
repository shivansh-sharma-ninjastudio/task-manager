export type TaskPriority = "Low" | "Medium" | "High";

export type TaskStatus = "To Do" | "In Progress" | "Done";

export type SortField = "createdAt" | "dueDate" | "priority";

export type SortOrder = "asc" | "desc";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: string;
  dueDate: string;
}

export type TaskDB = Task[];

export interface CreateTaskPayload {
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate: string;
}

export interface GetAllTasksPayload {
  filters: TaskFilters;
  sortConfig: TaskSortConfig;
}

export type EditTaskPayload = {
  id: string;
  updates: Partial<Omit<Task, "id" | "createdAt">>;
  //   omit removes id, created at , partial makes each field optional
};

export interface DeleteTaskPayload {
  id: string;
}

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  searchQuery?: string;
}

export interface TaskSortConfig {
  field: SortField;
  order: SortOrder;
}
