import { API } from "@/helpers/api/requests";
import { useGetDoctorByID } from "@/queries/useGetDoctorByID";
import { useMutation } from "@tanstack/react-query";

const useUserLogin = () => {
  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return API.doctors.login(email, password);
    },
  });

  return mutation;
};

export default useUserLogin;
