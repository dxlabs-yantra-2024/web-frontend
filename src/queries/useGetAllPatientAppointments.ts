import { API } from "@/helpers/api/requests";
import { useGetPatientToken } from "@/hooks/useGetPatientToken";
import { useQuery } from "@tanstack/react-query";

export const getAllPatientAppointmentsQueryKey = () => [
  "getAllPatientAppointments",
];

export const getAllPatientAppointmentsQueryFn = (token: string) =>
  API.patients.getAllAppointments(token);

const useGetAllPatientAppointments = () => {
  const { token } = useGetPatientToken();
  const queryResult = useQuery({
    queryKey: getAllPatientAppointmentsQueryKey(),
    queryFn: () => getAllPatientAppointmentsQueryFn(token),
  });

  return queryResult;
};

export { useGetAllPatientAppointments };
