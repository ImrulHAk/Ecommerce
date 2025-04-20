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
import Shop from "./Pages/Shop.jsx";
import SingleProduct from "./Pages/SingleProduct.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Rootlayout />}>
      <Route index element={<App />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/singleproduct/:id" element={<SingleProduct />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router} />
  </ThemeProvider>
);
