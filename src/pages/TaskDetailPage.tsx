import { useGetTask } from "@/hooks/tasks/useGetTask";
import { useParams } from "react-router";

export default function () {
  const { id } = useParams();
  const { taskDetails, loading, error } = useGetTask({ id: id! });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 flex flex-col gap-2">
      <h1 className="text-3xl">{taskDetails?.title}</h1>
      <p className="text-sm">{taskDetails?.description}</p>
      <p className="text-green-500">{taskDetails?.status}</p>
      <p className="text-sm">
        {new Date(taskDetails?.createdAt || "").toDateString()}
      </p>
    </div>
  );
}
