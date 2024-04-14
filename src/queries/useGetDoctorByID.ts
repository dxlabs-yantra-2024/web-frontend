import { API } from "@/helpers/api/requests";
import { useGetPatientToken } from "@/hooks/useGetPatientToken";
import { useQuery } from "@tanstack/react-query";

export const getDoctorByIDQueryKey = (id: string) => ["getDoctorByID", id];

export const getDoctorByIDQueryFunction = (
  id: string,
  type?: "Doctor" | "Patient",
  token?: string
) => {
  if (type === "Patient") return API.patients.getDoctorByID(id, token ?? "");
  API.doctors.getDoctorByID(id);
};

const useGetDoctorByID = ({
  id,
  type = "Doctor",
}: {
  id: string;
  type?: "Doctor" | "Patient";
}) => {
  const { token } = useGetPatientToken();
  const queryResult = useQuery({
    queryKey: getDoctorByIDQueryKey(id),
    queryFn: () => getDoctorByIDQueryFunction(id, type, token),
  });

  return queryResult;
};

export { useGetDoctorByID };
