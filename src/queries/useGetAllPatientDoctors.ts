import { API } from "@/helpers/api/requests";
import { useGetPatientToken } from "@/hooks/useGetPatientToken";
import { useQuery } from "@tanstack/react-query";

export const getAllPatientDoctorsQueryKey = () => ["getAllPatientDoctors"];

export const getAllPatientDoctorsQueryFn = (token: string) =>
  API.patients.getAllDoctors(token);

const useGetAllPatientDoctors = () => {
  const { token } = useGetPatientToken();
  const queryResult = useQuery({
    queryKey: getAllPatientDoctorsQueryKey(),
    queryFn: () => getAllPatientDoctorsQueryFn(token),
  });

  return queryResult;
};

export { useGetAllPatientDoctors };
