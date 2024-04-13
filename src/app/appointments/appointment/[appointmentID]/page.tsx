"use client";
import { parseISO, format } from "date-fns";
import { StatCard } from "@/components/StatCard";
import { useGetAppointmentByID } from "@/queries/useGetAppointmentByID";
import { RxAvatar, RxCaretSort } from "react-icons/rx";
import { Button } from "@/components/Button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DataTable } from "@/components/Table/Table";
import { useGetPatientAppointmentByID } from "@/queries/useGetPatientAppointmentByID";
import { ColumnDef } from "@tanstack/react-table";
import { AppointmentStatus } from "@/types/case";

type TAppointmentRow = {
  id: string;
  appointmentID: string;
  dateOfVisit: string;
  status: AppointmentStatus;
  action: React.ReactNode;
};

const columns: ColumnDef<TAppointmentRow>[] = [
  {
    accessorKey: "appointmentID",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Appointment ID
          <RxCaretSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    // @ts-ignore
    cell: ({ row }) => <div>#{row.getValue("appointmentID")?.slice(0, 6)}</div>,
  },
  {
    accessorKey: "dateOfVisit",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date of visit
          <RxCaretSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("dateOfVisit")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <RxCaretSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "action",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Action
          <RxCaretSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("action")}</div>,
  },
];

const Appointment = ({
  params,
}: {
  params: {
    appointmentID: string;
  };
}) => {
  const { data: appointment, isLoading: isAppointmentLoading } =
    useGetAppointmentByID({
      appointmentID: params.appointmentID,
    });
  const {
    data: patientAppointments,
    isLoading: isPatientsAppointmentsLoading,
  } = useGetPatientAppointmentByID({
    userID: appointment?.data?.user?.id,
  });

  const searchParams = useSearchParams();
  const workspaceID = searchParams.get("workspace");
  const parsedDate = appointment?.data?.start_time
    ? parseISO(appointment?.data?.start_time)
    : "";
  const formattedDate = parsedDate ? format(parsedDate, "dd MMM yyyy") : "";
  const patientsAppointmentsArray = patientAppointments?.data?.map(
    (appointment: any) => {
      return {
        appointmentID: appointment?.appointment?.id,
        dateOfVisit: appointment?.appointment?.start_time,
        status: appointment?.appointment?.status,
        action: (
          <Link
            href={`${appointment?.appointment?.id}/edit?workspace=${workspaceID}`}
            className="bg-primaryGreen p-2 rounded-md text-white"
          >
            View more
          </Link>
        ),
      };
    }
  );
  return (
    <div className="p-4">
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          <div className="w-full p-4 bg-white flex flex-col gap-10 rounded-12 ">
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
            <div className="flex gap-2">
              <StatCard
                label="Phone"
                value={appointment?.data?.user?.mobile_number}
              />
              <StatCard label="Email" value={appointment?.data?.user?.email} />
              <StatCard
                label="ABHA Number"
                value={appointment?.data?.user?.abhaNumber}
              />
            </div>
          </div>
          <div className="w-full p-4 bg-[#89EFB7] flex flex-col gap-10 rounded-12 ">
            <div className="flex items-center gap-6">
              <div className="bg-green-100 flex items-center justify-center rounded-md  h-[45px] w-[45px]">
                <RxAvatar size={28} className="text-gray-700" />
              </div>
              <div>
                <StatCard value="Appointment Details" />
              </div>
            </div>
            <div className="grid grid-cols-3">
              <StatCard
                label="Appointment ID"
                value={`#${params.appointmentID?.slice?.(0, 6)}`}
              />
              <StatCard label="Appointment Date" value={formattedDate} />
              <Link
                className="text-white bg-black p-2 rounded-md h-fit place-self-center"
                href={`${params.appointmentID}/edit?workspace=${workspaceID}`}
              >
                + Create Diagnosis
              </Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 p-4 bg-white flex flex-col gap-10 rounded-12 items-stretch">
            <div className="flex items-center gap-6">
              <div className="bg-[#42E8B4] flex items-center justify-center rounded-md  h-[45px] w-[45px]">
                <RxAvatar size={28} className="text-gray-700" />
              </div>
              <div>
                <StatCard label="Personal details" />
              </div>
            </div>
            <div className="grid grid-cols-5">
              <StatCard label="Age" value={appointment?.data?.user?.age} />
              <StatCard
                label="Gender"
                value={appointment?.data?.user?.gender}
              />
              <StatCard
                label="Height"
                value={appointment?.data?.user?.height}
              />
              <StatCard
                label="Weight"
                value={appointment?.data?.user?.weight}
              />
              <StatCard
                label="Blood type"
                value={appointment?.data?.user?.blood_group}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 h-full">
            <div className="w-full p-4 bg-white flex flex-col gap-10 rounded-12 h-full">
              <div className="flex justify-between">
                <div className="flex gap-4 items-center">
                  <div className="bg-green-200 h-[36px] w-[36px] flex items-center justify-center rounded-md">
                    <RxAvatar size={20} className="text-gray-700  rounded-md" />
                  </div>
                  <StatCard
                    label="Medical records"
                    value="Last updated 12 Sept 2021"
                  />
                </div>
                <button className="text-white bg-primaryGreen p-2 rounded-md h-fit">
                  View More
                </button>
              </div>
            </div>
            <div className="w-full p-4 bg-white flex flex-col gap-10 rounded-12 h-full">
              <div className="flex justify-between">
                <div className="flex gap-4 items-center">
                  <div className="bg-green-200 h-[36px] w-[36px] flex items-center justify-center rounded-md">
                    <RxAvatar size={20} className="text-gray-700  rounded-md" />
                  </div>
                  <StatCard
                    label="Pharmacy records"
                    value="Last updated 12 Sept 2021"
                  />
                </div>
                <button className="text-white bg-primaryGreen p-2 rounded-md h-fit">
                  View More
                </button>
              </div>
            </div>
          </div>
        </div>
        <DataTable
          isLoading={isAppointmentLoading || isPatientsAppointmentsLoading}
          columns={columns ?? []}
          data={patientsAppointmentsArray ?? []}
          filterField="reason"
          filterPlaceholder="Filter by patient name"
        />
      </div>
    </div>
  );
};

export default Appointment;
