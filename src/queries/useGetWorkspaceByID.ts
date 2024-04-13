import { API } from "@/helpers/api/requests";
import { useGetToken } from "@/hooks/useGetToken";
import { useQuery } from "@tanstack/react-query";

export const getWorkspaceByIDQueryKey = (id: string) => [
  "getWorkspaceByID",
  id,
];

export const getWorkspaceByIDQueryFunction = (id: string, token: string) =>
  API.workspaces.getWorkspaceByID(id, token);

const useGetWorkspaceByID = ({ id }: { id: string }) => {
  const { token } = useGetToken();
  const queryResult = useQuery({
    queryKey: getWorkspaceByIDQueryKey(id),
    queryFn: () => getWorkspaceByIDQueryFunction(id, token),
  });

  return queryResult;
};

export { useGetWorkspaceByID };
