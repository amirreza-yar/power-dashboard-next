import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

export function useDarkMode() {
  return useContext(DarkModeContext);
}

export function DarkModeProvider({ children }) {
  const [DarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // console.log("DarkMode state is:", DarkMode, DarkMode === true);

    if (DarkMode === true) {
      document.getElementById("html").classList.add("dark");
    //   console.log("Cookie DarkMode state is true:", !Cookies.get("darkMode"));
    } else {
      document.getElementById("html").classList.remove("dark");
      //   Cookies.set("darkMode", false, { SameSite: "None", Secure: true });
    //   console.log("Cookie DarkMode state is false:", !Cookies.get("darkMode"));
    }
    // Cookies.set("darkMode", DarkMode, { SameSite: "None", Secure: true });
  }, [DarkMode]);

  return (
    <DarkModeContext.Provider value={{ DarkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
