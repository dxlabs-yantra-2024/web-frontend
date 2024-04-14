"use client";
import { Header } from "@/components/Header/Header";
import { TextField } from "@/components/TextField";
import useUserLogin from "@/mutations/useUserLogin";
import { useGetCurrentDoctor } from "@/queries/useGetCurrentDoctor";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const router = useRouter();

  const { mutate: userLogin } = useUserLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const login = (data: any) => {
    userLogin(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (data: any) => {
          localStorage.setItem("token", data.data.token);
          router.push("/dashboard");
        },
      }
    );
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
                <p className="text-greySecondary text-[14px]">
                  Login to your account
                </p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit((data) => login(data))}>
            <div className="flex flex-col gap-12 items-center">
              <div className="flex flex-col gap-3 justify-center">
                <div className="flex flex-col gap-7 ">
                  <TextField
                    iconName="message"
                    placeholder="Email Address"
                    name="email"
                    register={register}
                  />
                  <TextField
                    iconName="lock"
                    placeholder="Password"
                    name="password"
                    register={register}
                    type="password"
                  />
                </div>
                <button className="self-end text-[#C4AE62]">
                  Recover Password
                </button>
              </div>
              <button className="p-4 bg-primaryGreen rounded-12 w-fit text-white">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
