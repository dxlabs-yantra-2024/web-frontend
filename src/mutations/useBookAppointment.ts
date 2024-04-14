import { API } from "@/helpers/api/requests";
import { useGetPatientToken } from "@/hooks/useGetPatientToken";
import { useMutation } from "@tanstack/react-query";

const useBookAppointment = () => {
  const { token } = useGetPatientToken();
  const mutation = useMutation({
    mutationFn: (data: {
      workspaceId: string;
      start_time: string;
      end_time: string;
      reason: string;
    }) => {
      return API.patients.bookAppointment(data, token);
    },
  });

  return mutation;
};

export default useBookAppointment;
