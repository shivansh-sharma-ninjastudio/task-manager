import { Card } from "./ui/card";
import type { Task } from "../types";

import { isTaskOverdue } from "../lib/utils";

const Stats = ({ tasks }: { tasks: Task[] }) => {
  const completedTasks = tasks.filter((task) => task.status === "Done").length;
  const pendingTasks = tasks.filter(
    (task) => task.status === "To Do" || task.status === "In Progress",
  ).length;
  const overdueTasks = tasks.filter(
    (task) => task.status !== "Done" && isTaskOverdue(task.dueDate),
  ).length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mb-5">
      <Stat title="Total Tasks" value={tasks.length}></Stat>
      <Stat title="Completed Tasks" value={completedTasks}></Stat>
      <Stat title="Pending Tasks" value={pendingTasks}></Stat>
      <Stat title="Overdue Tasks" value={overdueTasks}></Stat>
    </div>
  );
};

const Stat = ({ title, value }: { title: string; value: number }) => {
  return (
    <Card className="h-30 flex flex-col justify-between p-4">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-5xl font-bold ml-auto">{value}</p>
    </Card>
  );
};

export default Stats;
