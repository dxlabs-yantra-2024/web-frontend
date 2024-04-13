import { API } from "@/helpers/api/requests";
import { useGetToken } from "@/hooks/useGetToken";
import { useQuery } from "@tanstack/react-query";

export const getAppointmentByIDQueryKey = () => ["getAppointmentByID"];

export const getAppointmentByIDQueryFn = (workspaceID: string, token: string) =>
  API.workspaces.getAppointmentByID(workspaceID, token);

const useGetAppointmentByID = ({
  appointmentID,
}: {
  appointmentID: string;
}) => {
  const { token } = useGetToken();
  const queryResult = useQuery({
    queryKey: getAppointmentByIDQueryKey(),
    queryFn: () => getAppointmentByIDQueryFn(appointmentID, token),
  });

  return queryResult;
};

export { useGetAppointmentByID };
