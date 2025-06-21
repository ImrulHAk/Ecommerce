import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Rootlayout from "./Layout/Rootlayout.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import AllProduct from "./pages/AllProduct.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import AddCategory from './pages/AddCategory';
import AllCategory from './pages/AllCategory';
import AddBanner from "./pages/AddBanner.jsx";
import AllBanner from "./pages/AllBanner.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Rootlayout,
    children: [
      { index: true, Component: App },
      { path: "/addbanner", Component: AddBanner },
      { path: "/allbanner", Component: AllBanner },
      { path: "/addcategory", Component: AddCategory },
      { path: "/allcategory", Component: AllCategory },
      { path: "/addproduct", Component: AddProduct },
      { path: "/allproduct", Component: AllProduct },
    ],
  },
  {
    path: "/signin",
    Component: SignIn,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
