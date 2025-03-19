import React from "react";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";

const App = () => {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
      </ThemeProvider>
    </div>
  );
};

export default App;
