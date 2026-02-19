import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { TaskPriority, TaskStatus } from "@/types";
import DueDateView from "./DueDateView";

interface TaskProps {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: string;
  dueDate: string;
}

export function Task({
  id,
  title,
  description,
  priority,
  status,
  createdAt,
  dueDate,
  onDelete,
  onEdit,
  isDeleting,
}: TaskProps & {
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  isDeleting?: boolean;
}) {
  return (
    <Card className="w-full min-w-[200px]">
      <a href={`/task/${id}`}>
        <CardHeader>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">{title}</CardTitle>
            <Badge variant={priority}>{priority}</Badge>
          </div>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
      </a>
      <CardContent>
        <div className="flex items-center gap-2">
          <Badge variant={status}>{status}</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 items-start text-xs text-muted-foreground">
        <div className="flex flex-col gap-1">
          <span>Created: {new Date(createdAt).toLocaleDateString()}</span>
          <span>
            Due:{" "}
            <Badge variant="secondary">
              <DueDateView date={dueDate} />
            </Badge>
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="cursor-pointer"
            size="sm"
            onClick={() => {
              onEdit(id);
            }}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            disabled={isDeleting}
            className="cursor-pointer"
            onClick={() => {
              onDelete(id);
            }}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
