"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const ADDABLE_SECTIONS = ["Medications", "Vitals", "Symptoms"];

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
import { Checkbox } from "@/components/Checkbox";

const MedicationsForm = ({
  setSectionsData,
}: {
  setSectionsData: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <CardWithSeparator
      titleComponent={
        <CardWithSeparatorTitleText>Medications</CardWithSeparatorTitleText>
      }
      cardClassName="mb-8"
    >
      <form>
        <div className="grid grid-cols-2 gap-9">
          <TextField
            name="medication"
            label="Medication"
            placeholder="Amoxicillin"
            register={register}
          />
          <TextField
            name="dose"
            label="Dose"
            placeholder="500 mg"
            register={register}
          />
          <TextField
            name="frequency"
            label="Frequency"
            placeholder="3 times a day"
            register={register}
          />
          <TextField
            name="duration"
            label="Duration"
            placeholder="14 days"
            register={register}
          />
          <TextField
            name="startsFrom"
            label="Starts From"
            placeholder="14 April 2024"
            register={register}
          />
          <TextField
            name="timing"
            label="Timing"
            placeholder="Morning, Evening"
            register={register}
          />
        </div>
      </form>
    </CardWithSeparator>
  );
};
const VitalsForm = ({
  setSectionsData,
}: {
  setSectionsData: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <CardWithSeparator
      titleComponent={
        <CardWithSeparatorTitleText>Medications</CardWithSeparatorTitleText>
      }
      cardClassName="mb-8"
    >
      <form>
        <div className="grid grid-cols-2 gap-9">
          <TextField
            name="blood_pressure"
            label="Blood pressure"
            placeholder="120/80 mmHg"
            register={register}
          />
          <TextField
            name="body_temperature"
            label="Body Temperature"
            placeholder="98"
            register={register}
          />
          <TextField
            name="body_weight"
            label="Body Weight"
            placeholder="70"
            register={register}
          />
          <TextField
            name="diastolic_bp"
            label="Diastolic BP"
            placeholder="80"
            register={register}
          />
          <TextField
            name="systolic_bp"
            label="Systolic BP"
            placeholder="120"
            register={register}
          />
          <TextField
            name="peripheral_oxygen_saturation"
            label="Peripheral Oxygen Saturation"
            placeholder="98"
            register={register}
          />
          <TextField
            name="respiratory_rate"
            label="Respiratory Rate"
            placeholder="16"
            register={register}
          />
          <TextField
            name="pulse"
            label="Pulse"
            placeholder="72"
            register={register}
          />
        </div>
      </form>
    </CardWithSeparator>
  );
};
const SymptomsForm = ({
  setSectionsData,
}: {
  setSectionsData: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <CardWithSeparator
      titleComponent={
        <CardWithSeparatorTitleText>Symptoms</CardWithSeparatorTitleText>
      }
      cardClassName="mb-8"
    >
      <form>
        <div className="grid grid-cols-2 gap-9">
          <TextField
            name="name"
            label="Name"
            placeholder="Cough"
            register={register}
          />
          <TextField
            name="severity"
            label="Severity"
            placeholder="8"
            register={register}
          />
          <TextField
            name="details"
            label="Details"
            placeholder="Persistent dry cough without phlegm"
            register={register}
          />
          <TextField
            name="since"
            label="Since"
            placeholder="14 days / 2024-03-31"
            register={register}
          />
        </div>
      </form>
    </CardWithSeparator>
  );
};

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

  const [sectionsToBeAdded, setSectionsToBeAdded] = useState<string[]>([]);
  const handleCheckboxChange = (checked: boolean, section: string) => {
    if (checked) {
      setSectionsToBeAdded([...sectionsToBeAdded, section]);
    } else {
      setSectionsToBeAdded(sectionsToBeAdded.filter((s) => s !== section));
    }
  };
  const [sectionsData, setSectionsData] = useState<any>({
    medications: {},
    symptoms: {},
    vitals: {},
  });
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

            <div className="flex flex-col gap-5">
              <div className="flex gap-2 p-4 rounded-md bg-white items-center">
                <Checkbox
                  id="medications"
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(Boolean(checked), "medications")
                  }
                />
                <label htmlFor="medications" className="cursor-pointer">
                  Medications
                </label>
              </div>
              {sectionsToBeAdded.includes("medications") && (
                <MedicationsForm setSectionsData={setSectionsData} />
              )}
              <div className="flex gap-2 p-4 rounded-md bg-white items-center">
                <Checkbox
                  id="symptoms"
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(Boolean(checked), "symptoms")
                  }
                />
                <label htmlFor="symptoms" className="cursor-pointer">
                  Symptoms
                </label>
              </div>
              {sectionsToBeAdded.includes("symptoms") && (
                <SymptomsForm setSectionsData={setSectionsData} />
              )}
              <div className="flex gap-2 p-4 rounded-md bg-white items-center">
                <Checkbox
                  id="vitals"
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(Boolean(checked), "vitals")
                  }
                />
                <label htmlFor="vitals" className="cursor-pointer">
                  Vitals
                </label>
              </div>
              {sectionsToBeAdded.includes("vitals") && (
                <VitalsForm setSectionsData={setSectionsData} />
              )}
            </div>
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
