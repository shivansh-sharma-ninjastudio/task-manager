import { isDateToday, isDateTommorrow } from "@/lib/utils";

const DueDateView = ({ date }: { date: string }) => {
  if (isDateToday(new Date(date))) {
    return <div>Today</div>;
  }

  if (isDateTommorrow(new Date(date))) {
    return <div>Tomorrow</div>;
  }

  return <div>{new Date(date).toLocaleDateString()}</div>;
};

export default DueDateView;
