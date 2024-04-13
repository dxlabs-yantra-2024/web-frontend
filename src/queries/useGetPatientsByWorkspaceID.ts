import { API } from "@/helpers/api/requests";
import { useGetToken } from "@/hooks/useGetToken";
import { useQuery } from "@tanstack/react-query";

export const getPatientsByWorkspaceIDQueryKey = (workspaceID: string) => [
  "getPatientsByWorkspaceID",
  workspaceID,
];

export const getPatientsByWorkspaceIDQueryFn = (
  workspaceID: string,
  token: string
) => API.workspaces.getPatients(workspaceID, token);

const useGetPatientsByWorkspaceID = ({
  workspaceID,
}: {
  workspaceID: string;
}) => {
  const { token } = useGetToken();
  const queryResult = useQuery({
    queryKey: getPatientsByWorkspaceIDQueryKey(workspaceID),
    queryFn: () => getPatientsByWorkspaceIDQueryFn(workspaceID, token),
  });

  return queryResult;
};

export { useGetPatientsByWorkspaceID };
