"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { useAuth } from "@context/AuthContext";
import { useMessage } from "@context/MessageContext";

const ProtectedRoute = ({ children }) => {
  const { user, error, validateToken } = useAuth();
  const { push } = useRouter();
  const { setMessage } = useMessage();

  useEffect(() => {
    if (!user) {
      console.log(user);
      setMessage({ message: "لطفا ابتدا وارد حساب خود شوید", mesStatus: "info" });
      redirect("/dashboard/login");
    } else {
      validateToken();
      if (error !== null) {
        setMessage({ message: "لطفا مجددا وارد حساب خود شوید", mesStatus: "info" });
        redirect("/dashboard/login");
      }
    }
  }, []);

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;
