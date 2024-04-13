import { API } from "@/helpers/api/requests";
import { useGetToken } from "@/hooks/useGetToken";
import { TAppointment } from "@/types/appointment";
import { useMutation } from "@tanstack/react-query";

export type TEditAppointment = Pick<
  TAppointment,
  | "advices"
  | "diagnosis"
  | "chief_complaint"
  | "diff_diagnosis"
  | "examination_plan"
  | "history"
  | "management_plan"
>;

const useEditAppointment = () => {
  const { token } = useGetToken();
  console.log({ token });
  const mutation = useMutation({
    mutationFn: ({
      appointment,
      appointmentId,
    }: {
      appointment: TEditAppointment;
      appointmentId: TAppointment["appointmentId"];
    }) => {
      return API.workspaces.editAppointment(appointment, appointmentId, token);
    },
  });

  return mutation;
};

export default useEditAppointment;
