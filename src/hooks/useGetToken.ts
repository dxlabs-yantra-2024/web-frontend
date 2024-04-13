const useGetToken = () => {
  const token = localStorage.getItem("token");
  return {
    token: token || "",
  };
};

export { useGetToken };
