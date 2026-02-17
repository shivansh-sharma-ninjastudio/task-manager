import { useParams } from "react-router";

export default function () {
  const { id } = useParams();
  return <div className="text-3xl p-4">{id}</div>;
}
