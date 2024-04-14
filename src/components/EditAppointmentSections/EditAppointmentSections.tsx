import useEditAppointmentFields from "@/mutations/useEditAppointmentFields";
import { useForm } from "react-hook-form";
import {
  CardWithSeparator,
  CardWithSeparatorTitleText,
} from "../CardWithSeparator";
import { TextField } from "../TextField";

export const MedicationsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { mutate: addMedication } = useEditAppointmentFields("MEDICATIONS");
  const handleFormSubmit = (data: any) => {
    addMedication(data, {
      onSuccess: () => reset(),
    });
  };
  return (
    <CardWithSeparator
      titleComponent={
        <CardWithSeparatorTitleText>Medications</CardWithSeparatorTitleText>
      }
      cardClassName="mb-8"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
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
        <button
          className="mt-4 w-fit bg-primaryGreen text-white rounded-md p-2"
          type="submit"
        >
          + Add Medication
        </button>
      </form>
    </CardWithSeparator>
  );
};
export const VitalsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { mutate: addVitals } = useEditAppointmentFields("VITALS");
  const handleFormSubmit = (data: any) => {
    addVitals(data);
    reset();
  };
  return (
    <CardWithSeparator
      titleComponent={
        <CardWithSeparatorTitleText>Medications</CardWithSeparatorTitleText>
      }
      cardClassName="mb-8"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
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
        <button
          className="mt-4 w-fit bg-primaryGreen text-white rounded-md p-2"
          type="submit"
        >
          + Add Vitals
        </button>
      </form>
    </CardWithSeparator>
  );
};
export const SymptomsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { mutate: addSymptoms } = useEditAppointmentFields("SYMPTOMS");
  const handleFormSubmit = (data: any) => {
    addSymptoms(data);
    reset();
  };
  return (
    <CardWithSeparator
      titleComponent={
        <CardWithSeparatorTitleText>Symptoms</CardWithSeparatorTitleText>
      }
      cardClassName="mb-8"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
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
        <button
          className="mt-4 w-fit bg-primaryGreen text-white rounded-md p-2"
          type="submit"
        >
          + Add Symptoms
        </button>
      </form>
    </CardWithSeparator>
  );
};
