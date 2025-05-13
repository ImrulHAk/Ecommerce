import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartIcon from "./CartIcon";

const Rootlayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <CartIcon />
      <Footer />
    </>
  );
};

export default Rootlayout;
