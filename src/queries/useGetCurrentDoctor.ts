import { API } from "@/helpers/api/requests";
import { useGetToken } from "@/hooks/useGetToken";
import { useQuery } from "@tanstack/react-query";

export const getCurrentDoctorQueryKey = (token: string) => [
  "getCurrentDoctor",
  token,
];

export const getCurrentDoctorQueryFn = (token: string) =>
  API.doctors.getMe(token);

const useGetCurrentDoctor = () => {
  const { token } = useGetToken();
  const queryResult = useQuery({
    queryKey: getCurrentDoctorQueryKey(token ?? ""),
    queryFn: () => getCurrentDoctorQueryFn(token ?? ""),
    refetchOnMount: false,
  });

  return queryResult;
};

export { useGetCurrentDoctor };
