"use client";
import { parseISO, format } from "date-fns";
import { StatCard } from "@/components/StatCard";
import { useGetAppointmentByID } from "@/queries/useGetAppointmentByID";
import { RxAvatar } from "react-icons/rx";
import { Button } from "@/components/Button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const workspaceID = searchParams.get("workspace");
  console.log({ appointment });
  const parsedDate = appointment?.data?.start_time
    ? parseISO(appointment?.data?.start_time)
    : "";
  const formattedDate = parsedDate ? format(parsedDate, "dd MMM yyyy") : "";

  return (
    <div className="p-4">
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          <div className="w-full p-4 bg-white flex flex-col gap-10 rounded-12 shadow-md">
            <div className="flex items-center gap-6">
              <div className="bg-[#42E8B4] flex items-center justify-center rounded-md  h-[45px] w-[45px]">
                <RxAvatar size={28} className="text-gray-700" />
              </div>
              <div>
                <StatCard
                  label="Username"
                  value={`Registered since ${"Date"}`}
                />
              </div>
            </div>
            <div className="grid grid-cols-3">
              <StatCard label="Phone" value="Phone number" />
              <StatCard label="Email" value="Email" />
              <StatCard label="ABHA Number" value="ABHA number" />
            </div>
          </div>
          <div className="w-full p-4 bg-[#89EFB7] flex flex-col gap-10 rounded-12 shadow-md">
            <div className="flex items-center gap-6">
              <div className="bg-green-100 flex items-center justify-center rounded-md  h-[45px] w-[45px]">
                <RxAvatar size={28} className="text-gray-700" />
              </div>
              <div>
                <StatCard value="Appointment Details" />
              </div>
            </div>
            <div className="grid grid-cols-3 place-items-center">
              <StatCard
                label="Appointment ID"
                value={`#${params.appointmentID?.slice?.(0, 6)}`}
              />
              <StatCard label="Appointment Date" value={formattedDate} />
              <Link
                className="text-white bg-black p-2 rounded-md"
                href={`${params.appointmentID}/edit?workspace=${workspaceID}`}
              >
                + Create Diagnosis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
