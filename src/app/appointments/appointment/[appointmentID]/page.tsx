"use client";
"react";

import { useGetAppointmentByID } from "@/queries/useGetAppointmentByID";

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
  console.log({ appointment });
  return <div className="">{params.appointmentID}</div>;
};

export default Appointment;
