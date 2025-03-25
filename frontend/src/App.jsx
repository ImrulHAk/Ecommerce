import React from "react";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Banner from "./components/Banner";
import Categories from "./components/Categories";

const App = () => {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Banner />
        <Categories />
      </ThemeProvider>
    </div>
  );
};

export default App;
