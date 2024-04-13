"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import {
  CardWithSeparator,
  CardWithSeparatorTitleText,
} from "@/components/CardWithSeparator";
import { TextField } from "@/components/TextField";
import useEditAppointment, {
  TEditAppointment,
} from "@/mutations/useEditAppointment";
import { useGetAppointmentByID } from "@/queries/useGetAppointmentByID";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";

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
    // <div className="">
    //   <form
    //     className="flex flex-col gap-4 items-start"
    //     onSubmit={handleSubmit(handleFormSubmit)}
    //   >
    //     <TextField name="advices" placeholder="Advices" register={register} />
    //     <TextField
    //       name="diagnosis"
    //       placeholder="Diagnosis"
    //       register={register}
    //     />
    //     <TextField
    //       name="chief_complaint"
    //       placeholder="Chief Complaint"
    //       register={register}
    //     />
    //     <TextField
    //       name="diff_diagnosis"
    //       placeholder="Diff Diagnosis"
    //       register={register}
    //     />
    //     <TextField
    //       name="examination_plan"
    //       placeholder="Examination Plan"
    //       register={register}
    //     />
    //     <TextField name="history" placeholder="History" register={register} />
    //     <TextField
    //       name="management_plan"
    //       placeholder="Management Plan"
    //       register={register}
    //     />
    //     <Button onClick={handleSubmit(handleFormSubmit)}>Submit</Button>
    //   </form>
    // </div>
    <div className="p-4">
      <div className="grid grid-cols-6 gap-5">
        <div className="col-span-4">
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col gap-6">
              <CardWithSeparator
                titleComponent={
                  <CardWithSeparatorTitleText>
                    Chief Complaints
                  </CardWithSeparatorTitleText>
                }
              >
                <textarea
                  className="resize-none h-64 rounded-12 bg-bgGrey p-4"
                  placeholder="Chief complaints"
                  {...register}
                />
              </CardWithSeparator>
            </div>

            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  className="w-fit rounded-12 bg-primaryGreen p-4 text-white"
                  aria-label="Customize options"
                >
                  Add Section
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="min-w-[220px]  bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                  sideOffset={5}
                  side="right"
                >
                  <DropdownMenu.Item className="group text-[13px] leading-none text-black rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-primaryGreen data-[highlighted]:text-violet1">
                    asd
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="group text-[13px] leading-none text-black rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-primaryGreen data-[highlighted]:text-violet1">
                    asd
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="group text-[13px] leading-none text-black rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-primaryGreen data-[highlighted]:text-violet1">
                    asd
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="group text-[13px] leading-none text-black rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-primaryGreen data-[highlighted]:text-violet1">
                    asd
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="group text-[13px] leading-none text-black rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-primaryGreen data-[highlighted]:text-violet1">
                    asd
                  </DropdownMenu.Item>
                  <DropdownMenu.Arrow className="fill-white" />
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </form>
        </div>
        <div className="col-span-2">
          <div className=" flex flex-col gap-6">
            <CardWithSeparator
              titleComponent={
                <CardWithSeparatorTitleText>
                  Differential Diagnosis
                </CardWithSeparatorTitleText>
              }
              cardClassName="h-[405px]"
            >
              {null}
            </CardWithSeparator>
            <CardWithSeparator
              titleComponent={
                <CardWithSeparatorTitleText>
                  Management Plan
                </CardWithSeparatorTitleText>
              }
              cardClassName="h-[309px]"
            >
              {null}
            </CardWithSeparator>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
