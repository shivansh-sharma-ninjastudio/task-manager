import { useState, useEffect, useCallback } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { AddEditTask } from "./AddEditTask";
import type {
  Task,
  TaskFilters,
  TaskSortConfig,
  TaskPriority,
  TaskStatus,
  SortField,
} from "../types";
import { Badge } from "./ui/badge";
import { Check, MoveDown, MoveUp } from "lucide-react";

interface ControlPanelProps {
  filters: TaskFilters;
  sortConfig: TaskSortConfig;
  onFiltersChange: (filters: TaskFilters) => void;
  onSortChange: (sortConfig: TaskSortConfig) => void;
  onSearchChange: (query: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingTask: Task | undefined;
  onTaskAdded: (task: Task) => void;
  onTaskUpdated: (task: Task) => void;
  onClearFilters: () => void;
}

const priorities: TaskPriority[] = ["Low", "Medium", "High"];
const statuses: TaskStatus[] = ["To Do", "In Progress", "Done"];
const sortFields: { label: string; value: SortField }[] = [
  { label: "Date Created", value: "createdAt" },
  { label: "Due Date", value: "dueDate" },
  { label: "Priority", value: "priority" },
];

function useDebounce(callback: (value: string) => void, delay: number) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      callback(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return setValue;
}

export function ControlPanel({
  filters,
  sortConfig,
  onFiltersChange,
  onSortChange,
  onSearchChange,
  open,
  onOpenChange,
  editingTask,
  onTaskAdded,
  onTaskUpdated,
  onClearFilters,
}: ControlPanelProps) {
  const setSearchValue = useDebounce(onSearchChange, 300);

  const handlePriorityFilter = useCallback(
    (p: TaskPriority) => {
      onFiltersChange({
        ...filters,
        priority: filters.priority === p ? undefined : p,
      });
    },
    [filters, onFiltersChange],
  );

  const handleStatusFilter = useCallback(
    (s: TaskStatus) => {
      onFiltersChange({
        ...filters,
        status: filters.status === s ? undefined : s,
      });
    },
    [filters, onFiltersChange],
  );

  const handleSort = useCallback(
    (field: SortField) => {
      if (sortConfig.field === field) {
        onSortChange({
          field,
          order: sortConfig.order === "asc" ? "desc" : "asc",
        });
      } else {
        onSortChange({ field, order: "asc" });
      }
    },
    [sortConfig, onSortChange],
  );

  return (
    <Card className="p-4 w-full mb-5 flex flex-col md:flex-row items-start md:justify-between gap-3">
      <div className="flex items-center gap-2 flex-wrap">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Filter by
              {filters.priority && (
                <Badge variant={filters.priority}>{filters.priority}</Badge>
              )}
              {filters.status && (
                <Badge variant={filters.status}>{filters.status}</Badge>
              )}
              {(filters.priority || filters.status) && " •"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Priority</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {priorities.map((p) => (
              <DropdownMenuItem key={p} onClick={() => handlePriorityFilter(p)}>
                {p} {filters.priority === p && <Check />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {statuses.map((s) => (
              <DropdownMenuItem key={s} onClick={() => handleStatusFilter(s)}>
                {s} {filters.status === s && <Check />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Sort by
              <span className="flex items-center gap-2">
                {sortConfig.field === "createdAt" && "Date Created"}
                {sortConfig.field === "dueDate" && "Due Date"}
                {sortConfig.field === "priority" && "Priority"}
                {sortConfig.order === "asc" ? <MoveUp /> : <MoveDown />}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {sortFields.map((sf) => (
              <DropdownMenuItem
                key={sf.value}
                onClick={() => handleSort(sf.value)}
              >
                {sf.label}{" "}
                {sortConfig.field === sf.value &&
                  (sortConfig.order === "asc" ? <MoveUp /> : <MoveDown />)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Input
          placeholder="Search tasks..."
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-[200px]"
        />
        <Button className="cursor-pointer" onClick={onClearFilters}>
          Clear Filters
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">Add Task</Button>
          </DialogTrigger>
          <DialogContent>
            <AddEditTask
              task={editingTask}
              onTaskAdded={onTaskAdded}
              onTaskUpdated={onTaskUpdated}
            />
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
}
