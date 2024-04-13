import { API } from "@/helpers/api/requests";
import { useGetToken } from "@/hooks/useGetToken";
import { TDoctor } from "@/types/doctor";
import { TWorkspace } from "@/types/workspace";
import { useMutation } from "@tanstack/react-query";

const useCreateWorkspace = () => {
  const { token } = useGetToken();
  const mutation = useMutation({
    mutationFn: (workspaceName: TWorkspace["name"]) => {
      return API.workspaces.createWorkspace(workspaceName, token ?? "");
    },
  });

  return mutation;
};

export default useCreateWorkspace;
