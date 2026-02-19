import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import "./index.css";
import App from "./App.tsx";
import TaskDetailPage from "./pages/TaskDetailPage.tsx";
import Navigationbar from "./components/Navigationbar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navigationbar />
        <Routes>
          <Route index path="/" element={<App />} />
          <Route path="/task/:id" element={<TaskDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
