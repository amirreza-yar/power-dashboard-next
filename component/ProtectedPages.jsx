// ProtectedRoute.js
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@context/AuthContext";
import { useMessage } from "@context/MessageContext";
import axios from "axios";
import { LogoLoader } from "./Loaders";

const ProtectedRoute = ({ children }) => {
  const { user, error, logout } = useAuth();
  const { push } = useRouter();
  const { setMessage } = useMessage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        if (user) {
          // Check if the token is valid
          await axios.get("http://rcpss-sutech.ir/django/validate-token/", {
            headers: {
              Authorization: `Bearer ${user}`,
            },
          });
          setLoading(false);
        } else {
          setLoading(false);
          setMessage({
            message: "لطفا ابتدا وارد حساب خود شوید",
            mesStatus: "info",
          });
          push("/dashboard/login");
        }
      } catch (error) {
        setLoading(false);
        setMessage({
          message: "متاسفانه مشکلی در اعتبارسنجی توکن رخ داده است.",
          mesStatus: "error",
        });
        logout(); // Log out the user on token validation failure
      }
    };

    checkTokenValidity();
  }, [user, push, setMessage, logout]);

  return <>{loading ? <LogoLoader /> : user ? children : null}</>;
};

export default ProtectedRoute;