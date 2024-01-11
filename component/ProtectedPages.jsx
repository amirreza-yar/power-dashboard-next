"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { useAuth } from "@context/AuthContext";
import { useMessage } from "@context/MessageContext";

const ProtectedRoute = ({ children }) => {
  const { user, error } = useAuth();
  const { push } = useRouter();
  const { setMessage } = useMessage();

  useEffect(() => {
    if (!user) {
      setMessage({ message: "لطفا ابتدا وارد حساب خود شوید", mesStatus: "info" });
      redirect("/dashboard/login");
    }
  }, []);

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;
