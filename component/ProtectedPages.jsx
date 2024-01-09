"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { useAuth } from "@context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, error } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    console.log("In protected pages user is: ");
    console.log(user);
    console.log("In protected pages error is: ");
    console.log(error);
    if (!user) {
      push("/dashboard/login");
    }
  }, [user]);

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;
