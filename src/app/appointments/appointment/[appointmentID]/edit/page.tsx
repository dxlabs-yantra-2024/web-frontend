"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
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
import { RecordSymptoms } from "@/components/RecordSymptoms";
import { ENV } from "@/constants/env";
import { AudioRecorder } from "react-audio-voice-recorder";
import { LuLoader2 } from "react-icons/lu";
import useEditAppointmentFields from "@/mutations/useEditAppointmentFields";
import {
  MedicationsForm,
  SymptomsForm,
  VitalsForm,
} from "@/components/EditAppointmentSections";

export interface ApiResponse {
  status: boolean;
  message: string;
  transcription: string;
  diagnosis: Diagnosis;
}

export interface Diagnosis {
  index: number;
  message: DiagnosisMessage;
  logprobs: any;
  finish_reason: string;
}

export interface DiagnosisMessage {
  role: string;
  content: string;
}

export interface DiagnosisContent {
  conditions: Condition[];
}

export interface Condition {
  name: string;
  probability: string;
  insights: string;
}

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
  const [sectionsData, setSectionsData] = useState<{
    medications: any[];
    symptoms: any[];
    vitals: any[];
  }>({
    medications: [],
    symptoms: [],
    vitals: [],
  });
  const [isRecordingModalOpen, setIsRecordingModalOpen] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isAnalyzingText, setIsAnalyzingText] = useState(false);
  const onRecordingComplete = async (audioBlob: Blob) => {
    setIsAnalyzingText(true);
    const formData = new FormData();
    const audioFile = new File([audioBlob], "audio.webm", {
      type: "audio/webm",
    });
    formData.append("file", audioFile);
    try {
      const response = await fetch(
        `${ENV.API_ROOT}/workspaces/appointments/${params.appointmentID ?? ""}/audio`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      const data: ApiResponse = await response.json();
      if (data.diagnosis.message.content) {
        data.diagnosis.message.content = JSON.parse(
          data.diagnosis.message.content
        );
      }
      setResponse(data);
    } catch (error) {
      setResponse(null);
    } finally {
      setIsAnalyzingText(false);
    }
  };
  const getConditionPillColor = (probability: string) => {
    const num = probability.replace("%", "");
    const perc = Number(num);
    if (perc >= 80) {
      return "bg-green-500";
    }
    if (perc >= 50) {
      return "bg-yellow-500";
    }
    return "bg-red-500";
  };
  return (
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
                  <div className="flex w-full justify-between">
                    <CardWithSeparatorTitleText>
                      Chief Complaints
                    </CardWithSeparatorTitleText>

                    <AudioRecorder
                      onRecordingComplete={onRecordingComplete}
                      audioTrackConstraints={{
                        noiseSuppression: true,
                        echoCancellation: true,
                      }}
                      downloadOnSavePress={false}
                      downloadFileExtension="webm"
                    />
                  </div>
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
              {sectionsToBeAdded.includes("medications") && <MedicationsForm />}
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
              {sectionsToBeAdded.includes("symptoms") && <SymptomsForm />}
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
              {sectionsToBeAdded.includes("vitals") && <VitalsForm />}
            </div>
          </form>
        </div>
        <div className="col-span-2">
          <div className=" flex flex-col gap-6 sticky top-4">
            <CardWithSeparator
              titleComponent={
                <CardWithSeparatorTitleText>
                  Differential Diagnosis
                </CardWithSeparatorTitleText>
              }
              cardClassName="min-h-[405px]"
            >
              {!isAnalyzingText && response && (
                <div>
                  <p className="text-sm mb-4">
                    <strong>Transcription:</strong> {response.transcription}
                  </p>
                  <div className="space-y-3">
                    {(
                      response.diagnosis.message
                        .content as unknown as DiagnosisContent
                    ).conditions?.map((condition: Condition, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 border-b"
                      >
                        <div className="flex-1 flex flex-col gap-2">
                          <div className="flex justify-between">
                            <h4 className="text-lg font-medium">
                              {condition.name}
                            </h4>
                            <span
                              className={`px-3 py-1 rounded-full text-white text-xs font-bold flex items-center ${getConditionPillColor(
                                condition.probability
                              )}`}
                            >
                              {condition.probability}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {condition.insights}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {(isAnalyzingText || !response) && (
                <p className="text-sm text-gray-500">
                  Response will appear here after upload & analysis.
                </p>
              )}
              {isAnalyzingText && (
                <div className="my-8 w-full flex items-center justify-center">
                  <div className="animate-spin">
                    <LuLoader2 size={48} className="text-primaryGreen" />
                  </div>
                </div>
              )}
            </CardWithSeparator>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
