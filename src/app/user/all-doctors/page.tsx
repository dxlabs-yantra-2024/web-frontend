"use client";

import { Button } from "@/components/Button";
import { DataTable } from "@/components/Table/Table";
import { useGetAllPatientAppointments } from "@/queries/useGetAllPatientAppointments";
import { useGetAllPatientDoctors } from "@/queries/useGetAllPatientDoctors";
import { useGetAppointmentsByWorkspaceID } from "@/queries/useGetAppointments";
import { TAppointment } from "@/types/appointment";
import { AppointmentStatus, AppointmentType } from "@/types/case";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LuLoader2 } from "react-icons/lu";
import { RxCaretSort } from "react-icons/rx";

type TAppointmentRow = {
  id: string;
  name: string;
  email: string;
  mobileNumber: AppointmentStatus;
  status: AppointmentType;
};

const columns: ColumnDef<TAppointmentRow>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <RxCaretSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <RxCaretSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },

  {
    accessorKey: "mobileNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mobile Number
          <RxCaretSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("mobileNumber")}</div>,
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
          View More
          <RxCaretSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Link
        className="bg-primaryGreen p-2 rounded-md text-white"
        href={`/user/doctor-by-id/${row.getValue("id")}`}
      >
        View More
      </Link>
    ),
  },
];

const Dashboard = () => {
  const { data: appointments, isLoading: isAppointmentsLoading } =
    useGetAllPatientDoctors();
  const route = useRouter();
  const appointmentsArray = appointments?.data?.map((appointment: any) => {
    return {
      id: appointment.id,
      name: appointment.name,
      email: appointment.email,
      mobileNumber: appointment.mobile_number,
      status: appointment.status,
    };
  });
  return (
    <div className="w-full p-4">
      <DataTable
        isLoading={isAppointmentsLoading}
        data={appointmentsArray ?? []}
        columns={columns}
        filterField="reason"
        filterPlaceholder="Filter by patient name"
        onRowClick={(row) => {
          route.push(`/user/doctor-by-id/${row.id}`);
        }}
      />
    </div>
  );
};

export default Dashboard;
