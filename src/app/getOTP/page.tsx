"use client";
import { Header } from "@/components/Header/Header";
import { TextField } from "@/components/TextField";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import useGetOTP from "@/mutations/useGetOTP";
import { useState } from "react";
import useVerifyOTP from "@/mutations/useVerifyOTP";
export default function Home() {
  const { mutate: getOTP } = useGetOTP();
  const { mutate: verifyOTPOnBackend } = useVerifyOTP();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [OTPSent, setOTPSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const sendOTP = (data: any) => {
    getOTP(
      {
        mobileNumber: data.mobileNumber,
        token: token ?? "",
      },
      {
        onSuccess: () => setOTPSent(true),
      }
    );
  };

  const verifyOTP = (data: any) => {
    verifyOTPOnBackend(
      {
        otp: Number(data.otp),
        token: token ?? "",
      },
      {
        onSuccess: () => {
          router.push("/");
        },
      }
    );
  };
  
    reset();
  };
  return (
    <div className="h-[100%] flex flex-col ">
      <Header />
      <div className=" flex items-center justify-center flex-grow ">
        <div className="rounded-12 bg-white py-11 px-8 flex flex-col gap-14">
          <div className="flex flex-col gap-14">
            <div className="flex flex-col gap-7 items-center">
              <Image
                src={"/assets/logo.svg"}
                alt="logo"
                height={76}
                width={256}
              />
              <div className="flex flex-col gap-2">
                <h1 className="text-black text-[20px]">Welcome back!</h1>
                <p className="text-greySecondary text-[14px]">Get OTP</p>
              </div>
            </div>
          </div>
          <form>
            <div className="flex flex-col gap-12 items-center">
              <div className="flex flex-col gap-3 justify-center">
                <div className="flex flex-col gap-7 ">
                  <TextField
                    iconName="lock"
                    placeholder="Phone number"
                    register={register}
                    name="mobileNumber"
                  />
                  <button
                    className="p-4 bg-primaryGreen rounded-12 w-fit text-white"
                    type="button"
                    onClick={handleSubmit((data) => sendOTP(data))}
                  >
                    Send OTP
                  </button>
                  {OTPSent && (
                    <>
                      <TextField
                        iconName="lock"
                        placeholder="OTP"
                        register={register}
                        name="otp"
                      />
                      <button
                        className="p-4 bg-primaryGreen rounded-12 w-fit text-white"
                        type="button"
                        onClick={handleSubmit((data) => verifyOTP(data))}
                      >
                        Verify OTP
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
