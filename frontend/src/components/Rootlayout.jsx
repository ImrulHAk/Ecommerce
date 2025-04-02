import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Rootlayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Rootlayout;
