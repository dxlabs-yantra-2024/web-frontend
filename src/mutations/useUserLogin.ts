import { API } from "@/helpers/api/requests";
import { useGetDoctorByID } from "@/queries/useGetDoctorByID";
import { useMutation } from "@tanstack/react-query";

const useUserLogin = (type: "Doctor" | "Patient" = "Doctor") => {
  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      if (type === "Doctor") {
        return API.doctors.login(email, password);
      } else {
        return API.patients.login(email, password);
      }
    },
  });

  return mutation;
};

export default useUserLogin;
