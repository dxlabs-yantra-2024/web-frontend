"use client";

import { Button } from "@/components/Button";
import { DataTable } from "@/components/Table/Table";
import { useGetAllPatientAppointments } from "@/queries/useGetAllPatientAppointments";
import { useGetAppointmentsByWorkspaceID } from "@/queries/useGetAppointments";
import { TAppointment } from "@/types/appointment";
import { AppointmentStatus, AppointmentType } from "@/types/case";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import { LuLoader2 } from "react-icons/lu";
import { RxCaretSort } from "react-icons/rx";

type TAppointmentRow = {
  start_time: string;
  end_time: string;
  status: AppointmentStatus;
  type: AppointmentType;
};

const columns: ColumnDef<TAppointmentRow>[] = [
  {
    accessorKey: "start_time",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start time
          <RxCaretSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("start_time")}</div>,
  },
  {
    accessorKey: "end_time",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End time
          <RxCaretSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("end_time")}</div>,
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
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <RxCaretSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
  },
];

const Dashboard = () => {
  const { data: appointments, isLoading: isAppointmentsLoading } =
    useGetAllPatientAppointments();
  const route = useRouter();
  const appointmentsArray = appointments?.data?.map((appointment: any) => {
    return {
      id: appointment.id,
      start_time: appointment.start_time,
      end_time: appointment.end_time,
      status: appointment.status,
      type: appointment.type,
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
          // route.push(
          //   `/appointments/appointment/${row.appointmentId}${workspaceID ? "?workspace=" + workspaceID : ""}`
          // );
        }}
      />
    </div>
  );
};

export default Dashboard;
