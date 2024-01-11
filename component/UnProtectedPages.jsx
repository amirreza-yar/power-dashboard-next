"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { useAuth } from "@context/AuthContext";
import { useMessage } from "@context/MessageContext";

const UnProtectedRoute = ({ children }) => {
  const { user, error } = useAuth();
  const { push } = useRouter();
  const { setMessage } = useMessage();

  useEffect(() => {
    if (user) {
      push("/dashboard");
    }
  }, [user]);

  return <>{user ? null : children}</>;
};

export default UnProtectedRoute;
