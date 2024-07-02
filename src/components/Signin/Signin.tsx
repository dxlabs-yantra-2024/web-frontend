"use client";
import { Header } from "@/components/Header/Header";
import { TextField } from "@/components/TextField";
import useUserLogin from "@/mutations/useUserLogin";
import { useGetCurrentDoctor } from "@/queries/useGetCurrentDoctor";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const Signin = ({ type }: { type: "doctor" | "user" }) => {
  const router = useRouter();
  const isDoctor = type === "doctor";
  const { mutate: userLogin } = useUserLogin(isDoctor ? "Doctor" : "Patient");
  const [guestUserLoginTimerCount, setGuestUserLoginTimerCount] = useState<
    number | null
  >(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,

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
          localStorage.setItem(
            isDoctor ? "token" : "userLoginToken",
            data.data.token
          );
          router.push(isDoctor ? "/dashboard" : "/user/all-doctors");
        },
      }
    );
  };
  let guestUserLoginTimer: NodeJS.Timeout | null = null;
  const guestLogin = () => {
    setValue("email", `guest-${type}@email.com`);
    setValue("password", "12345678");
    setGuestUserLoginTimerCount(3);
    guestUserLoginTimer = setInterval(() => {
      setGuestUserLoginTimerCount((prev) => {
        if (prev === 1) {
          setGuestUserLoginTimerCount(0);
          handleSubmit((data) => login(data))();
          clearInterval(guestUserLoginTimer as NodeJS.Timeout);
          return null;
        }
        return prev! - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (guestUserLoginTimer) {
        clearTimeout(guestUserLoginTimer);
      }
    };
  }, []);
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
                <div className="flex w-full justify-between">
                  <button onClick={guestLogin} type="button">
                    Guest login
                  </button>
                  <button className="text-[#C4AE62]" type="button">
                    Recover Password
                  </button>
                </div>
              </div>
              <div className="flex w-full items-center gap-4 flex-col">
                <button
                  className="disabled:opacity-50 disabled:cursor-not-allowed p-4 bg-primaryGreen rounded-12 w-fit text-white"
                  disabled={typeof guestUserLoginTimerCount === "number"}
                >
                  {typeof guestUserLoginTimerCount === "number"
                    ? `Logging in (${guestUserLoginTimerCount}s)`
                    : "Login"}
                </button>
                <Link
                  className="text-primaryGreen"
                  href={`${isDoctor ? "" : "user"}/signup`}
                >
                  Create an account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
