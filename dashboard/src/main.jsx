import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/Login.jsx";
import Rootlayout from "./Layout/Rootlayout.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import AllProduct from "./pages/AllProduct.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Rootlayout,
    children: [
      { index: true, Component: App },
      { path: "/addproduct", Component: AddProduct },
      { path: "/allproduct", Component: AllProduct },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
