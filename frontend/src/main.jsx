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
import Login from "./Pages/Login.jsx";
import Registration from "./Pages/Registration.jsx";
import Cart from "./Pages/cart.jsx";
import Cheakout from "./Pages/Cheakout.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Rootlayout />}>
        <Route index element={<App />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/singleproduct/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/cheakout" element={<Cheakout/>} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router} />
  </ThemeProvider>
);
