import { API } from "@/helpers/api/requests";
import { useGetToken } from "@/hooks/useGetToken";
import { useMutation } from "@tanstack/react-query";

const useAskMedbot = () => {
  const { token } = useGetToken();
  const mutation = useMutation({
    mutationFn: (prompt: string) => {
      return API.doctors.askMedbot(prompt, token);
    },
  });

  return mutation;
};

export default useAskMedbot;
