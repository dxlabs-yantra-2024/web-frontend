import { API } from "@/helpers/api/requests";
import { useMutation } from "@tanstack/react-query";

const useVerifyOTP = () => {
  const mutation = useMutation({
    mutationFn: ({ otp, token }: { otp: number; token: string }) => {
      return API.doctors.verifyOTP(otp, token);
    },
  });

  return mutation;
};

export default useVerifyOTP;
