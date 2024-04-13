// import { API } from "@/helpers/api/requests";

// import { useMutation } from "@tanstack/react-query";

// const useGenerateABDMOTP = () => {
//   const mutation = useMutation({
//     mutationFn: (adhaarNumber: string) => {
//       return API.abdm.generateOTP(adhaarNumber);
//     },
//   });

//   return mutation;
// };

// export default useGenerateABDMOTP;

import { API } from "@/helpers/api/requests";
import { useGetToken } from "@/hooks/useGetToken";
import { TDoctor } from "@/types/doctor";
import { TWorkspace } from "@/types/workspace";
import { useMutation } from "@tanstack/react-query";

const useGenerateABDMOTP = () => {
  const mutation = useMutation({
    mutationFn: (adhaarNumber: string) => {
      return API.abdm.generateOTP(adhaarNumber);
    },
  });

  return mutation;
};

export default useGenerateABDMOTP;
