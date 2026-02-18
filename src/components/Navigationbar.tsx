import { ModeToggle } from "./mode-toggle";

const Navigationbar = () => {
  return (
    <nav className="h-20 w-full flex items-center justify-between p-10 fixed top-0 right-0 bg-card">
      <div className="flex items-center justify-center gap-2">
        <div className="bg-black dark:bg-white rounded-md w-8 h-8 opacity-70 text-white dark:text-black flex items-center justify-center font-bold max-md:hidden">
          T
        </div>
        <span className="text-xl font-semibold">Task Manager</span>
      </div>
      <ModeToggle />
    </nav>
  );
};

export default Navigationbar;
