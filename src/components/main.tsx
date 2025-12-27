import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App/App"; 
import "modern-normalize/modern-normalize.css";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster position="top-center" />
    </QueryClientProvider>
  </React.StrictMode>
);
