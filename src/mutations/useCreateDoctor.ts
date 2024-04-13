import { API } from "@/helpers/api/requests";
import { TDoctor } from "@/types/doctor";
import { useMutation } from "@tanstack/react-query";

const useCreateDoctor = () => {
  const mutation = useMutation({
    mutationFn: (doctor: TDoctor) => {
      return API.doctors.createDoctor(doctor);
    },
  });

  return mutation;
};

export default useCreateDoctor;
