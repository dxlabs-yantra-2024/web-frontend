// @ts-nocheck

"use client";

import {
  CardWithSeparator,
  CardWithSeparatorTitleText,
} from "@/components/CardWithSeparator";
import { TextField } from "@/components/TextField";
import { API } from "@/helpers/api/requests";
import { useADBMVerifyOTP } from "@/mutations/useADBMVerifyOTP";
import useGenerateABDMOTP from "@/mutations/useGenerateABDMOtp";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CreateABDM = () => {
  const steps = [
    {
      id: 1,
      label: "Step 1",
      description: "Enter adhaar number",
    },
    {
      id: 2,
      label: "Step 2",
      description: "Verify OTP",
    },
    {
      id: 3,
      label: "Step 3",
      description: "Create health ID ",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [activeStep, setActiveStep] = useState(0);
  const { mutate: generateABDMOTP } = useGenerateABDMOTP();
  const { mutate: verifyABDMOTP } = useADBMVerifyOTP();
  const [txnId, setTxnId] = useState("");
  const handleSubmitStep = (data: any) => {
    if (activeStep === 0) {
      generateABDMOTP(data.adhaarNumber, {
        onSuccess: (data: any) => {
          setTxnId(data.txnId);
          localStorage.setItem("abdmTxn", data.txnId);
          setActiveStep(activeStep + 1);
        },
      });
    } else if (activeStep === 1) {
      verifyABDMOTP(
        {
          otp: data.otp,
          txnId: txnId ?? localStorage.getItem("abdmTxn"),
        },
        {
          onSuccess: async (data: any) => {
            localStorage.setItem("txnToCreateUser", data.txnId);
            setActiveStep(activeStep + 1);
          },
        }
      );
    } else if (activeStep === 2) {
      const createNewUser = async () => {
        const txnIdForNewUser = localStorage.getItem("txnToCreateUser");
        await API.abdm.mobileOTP(txnIdForNewUser ?? "", data.mobileNumber);
        await API.abdm.createUserAfterABDM(txnIdForNewUser ?? "");
      };
      createNewUser();
    }
  };
  return (
    <div className="p-4">
      <CardWithSeparator
        titleComponent={
          <CardWithSeparatorTitleText>
            {steps[activeStep].label}
          </CardWithSeparatorTitleText>
        }
        subtext={steps[activeStep].description}
      >
        <form onSubmit={handleSubmit((data) => handleSubmitStep(data))}>
          <div className="flex flex-col gap-2">
            {activeStep === 0 && (
              <TextField
                name="adhaarNumber"
                register={register}
                label="Adhaar Number"
              />
            )}
            {activeStep === 1 && (
              <>
                <TextField name="otp" register={register} label="OTP" />
              </>
            )}
            {activeStep === 2 && (
              <TextField
                name="mobileNumber"
                register={register}
                label="Mobile number"
              />
            )}

            <button
              className="w-fit p-2 px-4 rounded-md bg-primaryGreen text-white"
              type="submit"
              onClick={handleSubmit(handleSubmitStep)}
            >
              Next
            </button>
          </div>
        </form>
      </CardWithSeparator>
    </div>
  );
};

export default CreateABDM;
