import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

export function useDarkMode() {
  return useContext(DarkModeContext);
}

export function DarkModeProvider({ children }) {
  const [DarkMode, toggleDarkMode] = useState(false);

  // useEffect(() => {
  //   if (DarkMode === undefined) {
  //     Cookies.set("dark", false);
  //     console.log("setting dark >>>>>>>>>>>>>>>>>");
  //     toggleDarkMode(false);
  //   }
  //   DarkMode
  //     ? document.getElementById("html").classList.add("dark")
  //     : document.getElementById("html").classList.remove("dark");
  // }, [DarkMode]);

  return (
    <DarkModeContext.Provider value={{ DarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
