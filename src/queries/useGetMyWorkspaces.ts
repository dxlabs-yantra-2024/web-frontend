import { API } from "@/helpers/api/requests";
import { useGetToken } from "@/hooks/useGetToken";
import { useQuery } from "@tanstack/react-query";

export const getMyWorkspacesQueryKey = () => ["getMyWorkspaces"];

export const getMyWorkspacesQueryFn = (token: string) =>
  API.workspaces.getWorkspaces(token);

const useGetMyWorkspaces = () => {
  const { token } = useGetToken();
  const queryResult = useQuery({
    queryKey: getMyWorkspacesQueryKey(),
    queryFn: () => getMyWorkspacesQueryFn(token),
  });

  return queryResult;
};

export { useGetMyWorkspaces };
