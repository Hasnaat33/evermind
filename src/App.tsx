import { HashRouter } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppShell } from "@/components/layout/AppShell";

export default function App() {
  return (
    <HashRouter>
      <TooltipProvider>
        <AppShell />
      </TooltipProvider>
    </HashRouter>
  );
}
