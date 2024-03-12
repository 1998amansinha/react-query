import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import App from "./App.jsx";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60000 , gcTime: 10 * (60 * 1000) } },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
