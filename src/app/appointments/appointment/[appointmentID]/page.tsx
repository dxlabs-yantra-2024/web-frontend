"use client";

import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import useEditAppointment, {
  TEditAppointment,
} from "@/mutations/useEditAppointment";
import { useGetAppointmentByID } from "@/queries/useGetAppointmentByID";
import { useForm } from "react-hook-form";

const Appointment = ({
  params,
}: {
  params: {
    appointmentID: string;
  };
}) => {
  const { data: appointment } = useGetAppointmentByID({
    appointmentID: params.appointmentID,
  });
  const { mutate: editAppointment } = useEditAppointment();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleFormSubmit = (data: TEditAppointment) => {
    editAppointment({ appointment: data, appointmentId: params.appointmentID });
  };
  return (
    <div className="">
      <form
        className="flex flex-col gap-4 items-start"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <TextField name="advices" placeholder="Advices" register={register} />
        <TextField
          name="diagnosis"
          placeholder="Diagnosis"
          register={register}
        />
        <TextField
          name="chief_complaint"
          placeholder="Chief Complaint"
          register={register}
        />
        <TextField
          name="diff_diagnosis"
          placeholder="Diff Diagnosis"
          register={register}
        />
        <TextField
          name="examination_plan"
          placeholder="Examination Plan"
          register={register}
        />
        <TextField name="history" placeholder="History" register={register} />
        <TextField
          name="management_plan"
          placeholder="Management Plan"
          register={register}
        />
        <Button onClick={handleSubmit(handleFormSubmit)}>Submit</Button>
      </form>
    </div>
  );
};

export default Appointment;
