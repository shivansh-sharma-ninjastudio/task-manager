import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetTask } from "@/hooks/tasks/useGetTask";
import { ArrowLeft } from "lucide-react";
import { useParams } from "react-router";

export default function () {
  const { id } = useParams();
  const { taskDetails, loading, error } = useGetTask({ id: id! });

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full">
      <div className="p-10 maflex flex-col gap-2 mx-auto max-w-[1000px]">
        <a href="/">
          <Button className="ml-2 mb-4 cursor-pointer" variant={"outline"}>
            <ArrowLeft /> Back
          </Button>
        </a>
        <h1 className="text-3xl mb-4 ml-2">
          {loading ? "Loading..." : taskDetails?.title}
        </h1>
        <div className="flex max-sm:flex-col gap-5">
          <Card className="text-sm p-5 flex-2 flex flex-col gap-1">
            <p className="text-sm dark:opacity-50 font-semibold">
              Description :
            </p>
            <p className="text-sm">
              {loading ? "....." : taskDetails?.description}
            </p>
          </Card>
          <Card className="text-sm p-5 flex-1 flex-col gap-2">
            <div className="flex flex-col gap-2">
              <p className="text-sm dark:opacity-50 font-semibold">Details :</p>
              <div className="flex gap-2 items-center">
                <p>Date :</p>
                {loading ? (
                  "....."
                ) : (
                  <Badge variant="secondary">
                    {new Date(taskDetails?.createdAt || "").toDateString()}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <p>Status :</p>
                {loading ? (
                  "....."
                ) : (
                  <Badge variant={taskDetails?.status}>
                    {taskDetails?.status}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <p>Priority :</p>
                {loading ? (
                  "....."
                ) : (
                  <Badge variant={taskDetails?.priority}>
                    {taskDetails?.priority}
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
