import { API } from "@/helpers/api/requests";
import { useGetToken } from "@/hooks/useGetToken";
import { TDoctor } from "@/types/doctor";
import { TWorkspace } from "@/types/workspace";
import { useMutation } from "@tanstack/react-query";

const useADBMVerifyOTP = () => {
  const mutation = useMutation({
    mutationFn: ({ otp, txnId }: { otp: string; txnId: string }) => {
      return API.abdm.verifyOTP(otp, txnId);
    },
  });

  return mutation;
};

export default useADBMVerifyOTP;
