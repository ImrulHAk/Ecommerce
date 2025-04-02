import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router";
import Rootlayout from "./components/Rootlayout.jsx";
import { ThemeProvider } from "@/components/theme-provider";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Rootlayout />}>
      <Route index element={<App />} />
      <Route path="/shop" element={<h1>Shop</h1>} />
    </Route>
  )
); 

createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router} />
  </ThemeProvider>
);
