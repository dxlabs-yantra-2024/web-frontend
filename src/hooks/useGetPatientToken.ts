import { useEffect, useState } from "react";

const useGetPatientToken = () => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("userLoginToken");
    setToken(token || "");
  }, []);
  return {
    token: token || "",
  };
};

export { useGetPatientToken };
