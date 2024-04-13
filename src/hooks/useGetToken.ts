import { useEffect, useState } from "react";

const useGetToken = () => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token || "");
  }, []);
  return {
    token: token || "",
  };
};

export { useGetToken };
