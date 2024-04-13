import { API } from "@/helpers/api/requests";
import { useGetToken } from "@/hooks/useGetToken";
import { useQuery } from "@tanstack/react-query";

export const getPatientAppointmentByIDQueryKey = (appointmentID: string) => [
  "getPatientAppointmentByID",
  appointmentID,
];

export const getPatientAppointmentByIDQueryFn = (
  workspaceID: string,
  token: string
) => API.workspaces.getPatientAppointmentByID(workspaceID, token);

const useGetPatientAppointmentByID = ({ userID }: { userID: string }) => {
  const { token } = useGetToken();
  const queryResult = useQuery({
    queryKey: getPatientAppointmentByIDQueryKey(userID),
    queryFn: () => getPatientAppointmentByIDQueryFn(userID, token),
  });

  return queryResult;
};

export { useGetPatientAppointmentByID };
