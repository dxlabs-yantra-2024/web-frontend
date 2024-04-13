import { API } from "@/helpers/api/requests";
import { useMutation } from "@tanstack/react-query";

const useGetOTP = () => {
  const mutation = useMutation({
    mutationFn: ({
      mobileNumber,
      token,
    }: {
      mobileNumber: string;
      token: string;
    }) => {
      return API.doctors.getOTP(mobileNumber, token);
    },
  });

  return mutation;
};

export default useGetOTP;
