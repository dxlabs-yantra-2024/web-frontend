import { API } from "@/helpers/api/requests";
import { useGetToken } from "@/hooks/useGetToken";
import { useQuery } from "@tanstack/react-query";

export const getAppointmentsByWorkspaceIDQueryKey = (workspaceID: string) => [
  "getAppointmentsByWorkspaceID",
  workspaceID,
];

export const getAppointmentsByWorkspaceIDQueryFn = (
  workspaceID: string,
  token: string
) => API.workspaces.getAppointmentByWorkspaceID(workspaceID, token);

const useGetAppointmentsByWorkspaceID = ({
  workspaceID,
}: {
  workspaceID: string;
}) => {
  const { token } = useGetToken();
  const queryResult = useQuery({
    queryKey: getAppointmentsByWorkspaceIDQueryKey(workspaceID),
    queryFn: () => getAppointmentsByWorkspaceIDQueryFn(workspaceID, token),
  });

  return queryResult;
};

export { useGetAppointmentsByWorkspaceID };
