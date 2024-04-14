"use client";
import { AudioRecorder } from "react-audio-voice-recorder";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ENV } from "@/constants/env";
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

const RecordSymptoms = ({
  status,
  setStatus,
  response,
  setResponse,
  appointmentId,
  setModalOpen,
}: {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  response: ApiResponse | null;
  setResponse: React.Dispatch<React.SetStateAction<ApiResponse | null>>;
  appointmentId: string;
  setModalOpen: () => void;
}) => {
  const onCloseModal = useCallback(() => {
    // @ts-ignore
    setModalOpen(false);
  }, [setModalOpen]);

  const onRecordingComplete = (audioBlob: Blob) => {
    const formData = new FormData();
    const audioFile = new File([audioBlob], "audio.webm", {
      type: "audio/webm",
    });
    formData.append("file", audioFile);

    fetch(`${ENV.API_ROOT}/workspaces/appointments/${appointmentId}/audio`, {
      method: "PATCH",
      body: formData,
    })
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        setStatus(`Status: Upload ${data.status ? "Successful" : "Failed"}`);
        if (data.diagnosis.message.content) {
          data.diagnosis.message.content = JSON.parse(
            data.diagnosis.message.content
          );
        }
        setResponse(data);
        onCloseModal();
      })
      .catch((error) => {
        setStatus(`Status: Upload Failed`);
        setResponse(null);
      });
  };

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("file", file);

      fetch(`${ENV.API_ROOT}/workspaces/appointments/${appointmentId}/audio`, {
        method: "PATCH",
        body: formData,
      })
        .then((response) => response.json())
        .then((data: ApiResponse) => {
          setStatus(`Status: Upload ${data.status ? "Successful" : "Failed"}`);
          if (data.diagnosis.message.content) {
            data.diagnosis.message.content = JSON.parse(
              data.diagnosis.message.content
            );
          }
          setResponse(data);
          onCloseModal();
        })
        .catch((error) => {
          setStatus(`Status: Upload Failed`);
          setResponse(null);
        });
    },
    [appointmentId, onCloseModal, setResponse, setStatus]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div className="flex flex-col md:flex-row justify-center items-start md:items-center ">
      <AudioRecorder
        onRecordingComplete={onRecordingComplete}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        downloadOnSavePress={false}
        downloadFileExtension="webm"
      />
      {/* <div className="bg-white p-6 rounded-lg shadow-lg m-4 w-full md:w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Upload Audio File</h2>
        <div
          {...getRootProps()}
          className="flex flex-col items-center px-4 py-12 border-2 border-dashed border-gray-300 text-gray-700 cursor-pointer"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-green-500">Drop the files here ...</p>
          ) : (
            <p>Drag & drop some files here, or click to select files</p>
          )}
        </div>
        <div className="mt-4">
          <p className="text-sm">
            Status: <span className="font-medium text-green-600">{status}</span>
          </p>
        </div>
      </div> */}
      {/* <div className="bg-white p-6 rounded-lg shadow-lg m-4 w-full md:w-1/2">
        <h3 className="text-xl font-semibold mb-4">
          Transcription and Diagnosis
        </h3>
        {response && (
          <div>
            <p className="text-sm mb-4">
              <strong>Transcription:</strong> {response.transcription}
            </p>
            <div className="space-y-3">
              {(
                response.diagnosis.message
                  .content as unknown as DiagnosisContent
              ).conditions.map((condition: Condition, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 border-b"
                >
                  <div className="flex-1">
                    <h4 className="text-lg font-medium">{condition.name}</h4>
                    <p className="text-sm text-gray-600">
                      {condition.insights}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-bold ${
                      condition.probability === "High"
                        ? "bg-red-500"
                        : condition.probability === "Medium"
                          ? "bg-yellow-500"
                          : condition.probability === "Low"
                            ? "bg-green-500"
                            : "bg-blue-500"
                    }`}
                  >
                    {condition.probability}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        {!response && (
          <p className="text-sm text-gray-500">
            Response will appear here after upload.
          </p>
        )}
      </div> */}
    </div>
  );
};

export { RecordSymptoms };
