import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const AuthWrapper = ({ children }) => {
  const router = useRouter();
  const userToken = Cookies.get("userToken");

  useEffect(() => {
    if (!userToken && router.pathname !== "/login") {
      router.push("/login");
    }
  }, [router.pathname, userToken]);

  return <>{children}</>;
};

export default AuthWrapper;
