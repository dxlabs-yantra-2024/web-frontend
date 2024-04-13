import { API } from "@/helpers/api/requests";
import { useQuery } from "@tanstack/react-query";

export const getDoctorByIDQueryKey = (id: string) => ["getDoctorByID", id];

export const getDoctorByIDQueryFunction = (id: string) =>
  API.doctors.getDoctorByID(id);

const useGetDoctorByID = ({ id }: { id: string }) => {
  const queryResult = useQuery({
    queryKey: getDoctorByIDQueryKey(id),
    queryFn: () => getDoctorByIDQueryFunction(id),
  });

  return queryResult;
};

export { useGetDoctorByID };
