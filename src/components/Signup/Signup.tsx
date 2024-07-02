"use client";
import { Header } from "@/components/Header/Header";
import { TextField } from "@/components/TextField";
import Image from "next/image";
// import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useCreateUser from "@/mutations/useCreateUser";
import { TUser } from "@/types/user";
import { TDoctor } from "@/types/doctor";
import useCreateDoctor from "@/mutations/useCreateDoctor";
import Link from "next/link";
export const Signup = ({ type = "doctor" }: { type: "doctor" | "user" }) => {
  const { mutate: createDoctor } = useCreateDoctor();
  const { mutate: createUser } = useCreateUser();
  const router = useRouter();
  const isDoctor = type === "doctor";
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSubmitForm = (data: TDoctor | TUser) => {
    (isDoctor ? createDoctor : createUser)(data, {
      onSuccess: (data: any) => {
        const token = data.data.token;
        router.push(`/getOTP?token=${token}`);
      },
    });
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
                <p className="text-greySecondary text-[14px]">
                  Create {isDoctor ? "doctor" : "user"} account
                </p>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit((data) =>
              handleSubmitForm(data as TDoctor | TUser)
            )}
          >
            <div className="flex flex-col gap-12 items-center">
              <div className="flex flex-col gap-3 justify-center">
                <div className="flex flex-col gap-7 ">
                  <TextField
                    iconName="lock"
                    placeholder="Name"
                    register={register}
                    name="name"
                  />
                  <TextField
                    iconName="lock"
                    placeholder="Username"
                    register={register}
                    name="username"
                  />
                  <TextField
                    iconName="message"
                    placeholder="Email Address"
                    register={register}
                    name="email"
                  />
                  <TextField
                    iconName="lock"
                    placeholder="Password"
                    register={register}
                    name="password"
                    type="password"
                  />
                </div>
                <button className="self-end text-[#C4AE62]">
                  Recover Password
                </button>
              </div>

              <div className="flex w-full items-center gap-4 flex-col">
                <button
                  className="p-4 bg-primaryGreen rounded-12 w-fit text-white"
                  type="submit"
                >
                  Sign up
                </button>
                <Link
                  className="text-primaryGreen"
                  href={isDoctor ? "/" : "/user"}
                >
                  Already have an account? Sign in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTliODc4MzcxNjJhOTY5NjdhZDkzNyIsInJvbGUiOiJwZW5kaW5nIiwiaWF0IjoxNzEyOTYxNjU2LCJleHAiOjE3MTM4MjU2NTZ9.0zjcnevsO9chO3vN2zWR5FrZ0RBHjx6wKrZ2Hbr4fgM",
