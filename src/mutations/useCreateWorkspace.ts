import { API } from "@/helpers/api/requests";
import { TDoctor } from "@/types/doctor";
import { TWorkspace } from "@/types/workspace";
import { useMutation } from "@tanstack/react-query";

const useCreateWorkspace = () => {
  const token = localStorage.getItem("token");
  const mutation = useMutation({
    mutationFn: (workspaceName: TWorkspace["name"]) => {
      return API.workspaces.createWorkspace(workspaceName, token ?? "");
    },
  });

  return mutation;
};

export default useCreateWorkspace;
