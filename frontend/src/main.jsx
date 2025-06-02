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
import Otpverify from "./Pages/Otpverify.jsx";
import store from "../store";
import { Provider } from 'react-redux'
import Paysuccess from "./Pages/Paysuccess.jsx";
import Payfailed from "./Pages/Payfailed.jsx";
import Paycancel from "./Pages/Paycancel.jsx";
import Payipn from "./Pages/Payipn.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Rootlayout />}>
        <Route index element={<App />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/singleproduct/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cheakout" element={<Cheakout />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/otp" element={<Otpverify />} />
      <Route path="/paysuccess" element={<Paysuccess />} />
      <Route path="/payfail" element={<Payfailed />} />
      <Route path="/paycancel" element={<Paycancel />} />
      <Route path="/payipn" element={<Payipn />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);
