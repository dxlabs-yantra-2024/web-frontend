import { API } from "@/helpers/api/requests";
import { TUser } from "@/types/user";
import { useMutation } from "@tanstack/react-query";

const useCreateUser = () => {
  const mutation = useMutation({
    mutationFn: (user: TUser) => {
      return API.users.createUser(user);
    },
  });

  return mutation;
};

export default useCreateUser;
