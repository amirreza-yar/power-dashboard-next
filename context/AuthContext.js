// contexts/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(Cookies.get("accessToken"));
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Access token from cookies: " + Cookies.get("accessToken"));
    setUser(Cookies.get("accessToken"));
    console.log(user);
  }, [user]);

  const login = async (uuid, password) => {
    try {
      const response = await axios.post(
        "http://rcpss-sutech.ir/django/api/token/",
        { uuid, password }
      );
      const { access, refresh } = response.data;

      // Store tokens in cookies
      Cookies.set("accessToken", access, { SameSite: "None", Secure: true });
      Cookies.set("refreshToken", refresh, { SameSite: "None", Secure: true });

      console.log(`Access token: ${access}`);
      // Fetch user details or set user state based on response
      // const userDetails = await fetchUserDetails();
      // setUser(userDetails);
      setUser(access);
      console.log("User is: " + user);
    } catch (err) {
      setUser(null);
      setError("Login failed. Please try again.");
    }
  };

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};