// contexts/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(Cookies.get("accessToken"));
  const [error, setError] = useState(null);

  useEffect(() => {
    setUser(Cookies.get("accessToken"));
  }, [user]);

  const login = async (response) => {
    try {
      const { access, refresh } = response.data;

      // Store tokens in cookies
      Cookies.set("accessToken", access, { expires: 7, path: "/" });
      Cookies.set("refreshToken", refresh, { expires: 7, path: "/" });

      // Fetch user details or set user state based on response
      // const userDetails = await fetchUserDetails();
      // setUser(userDetails);
      setError(null);
      setUser(access);
    } catch (err) {
      setError(err);
      setError("Login failed. Please try again.");
    }
  };

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setUser(null);
  };

  const validateToken = async () => {
    try {
      const response = await axios.get(
        "http://rcpss-sutech.ir/django/validate-token/",
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      );
      const res = await response.data;
      setUser(res.access_token);
      setError(null);
      return true
    } catch {
      logout();
      return false
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout, validateToken }}>
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
