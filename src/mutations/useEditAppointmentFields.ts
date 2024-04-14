import { API } from "@/helpers/api/requests";
import { useGetToken } from "@/hooks/useGetToken";
import { useMutation } from "@tanstack/react-query";

const useEditAppointmentFields = (
  type: "MEDICATIONS" | "VITALS" | "SYMPTOMS"
) => {
  const { token } = useGetToken();
  const mutation = useMutation({
    mutationFn: ({
      appointment,
      appointmentId,
    }: {
      appointment: any;
      appointmentId: string;
    }) => {
      switch (type) {
        case "MEDICATIONS":
          return API.workspaces.addMedication(
            appointment,
            appointmentId,
            token
          );
        case "VITALS":
          return API.workspaces.addVitals(appointment, appointmentId, token);
        case "SYMPTOMS":
          return API.workspaces.addSymptoms(appointment, appointmentId, token);
        default:
          return API.workspaces.addMedication(
            appointment,
            appointmentId,
            token
          );
      }
    },
  });

  return mutation;
};

export default useEditAppointmentFields;
