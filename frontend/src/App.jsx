import React from "react";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Banner from "./components/Banner";
import Categories from "./components/Categories";
import Footer from "./components/Footer";
import Featuresproduct from "./components/Featuresproduct";

const App = () => {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Banner />
        <Categories />
        <Featuresproduct />
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default App;
