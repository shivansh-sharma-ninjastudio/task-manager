import { ModeToggle } from "./components/mode-toggle";
import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Button className="cursor-pointer">Click me</Button>
      <ModeToggle />
    </div>
  );
}

export default App;
