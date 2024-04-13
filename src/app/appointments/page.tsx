"use client";

import { Button } from "@/components/Button";
import { DataTable } from "@/components/Table/Table";
import { useGetAppointmentsByWorkspaceID } from "@/queries/useGetAppointments";
import { TAppointment } from "@/types/appointment";
import { AppointmentStatus, AppointmentType } from "@/types/case";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import { LuLoader2 } from "react-icons/lu";
import { RxCaretSort } from "react-icons/rx";

type TAppointmentRow = {
  id: string;
  appointmentId: string;
  start_time: string;
  end_time: string;
  userID: string;
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
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("start_time")}</div>
    ),
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
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("end_time")}</div>
    ),
  },
  {
    accessorKey: "userID",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          userID
          <RxCaretSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("userID")}</div>
    ),
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
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("status")}</div>
    ),
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
    cell: ({ row }) => <div className="lowercase">{row.getValue("type")}</div>,
  },
];

const Dashboard = () => {
  const searchParams = useSearchParams();
  const workspaceID = searchParams.get("workspace");
  const { data: appointments, isLoading: isAppointmentsLoading } =
    useGetAppointmentsByWorkspaceID({
      workspaceID: workspaceID ?? "",
    });
  const route = useRouter();
  console.log(appointments?.data);
  const appointmentsArray = appointments?.data
    ?.filter((appointment: any) => appointment?.appointment)
    .map((appointment: any) => {
      return {
        appointmentId: appointment.appointmentId,
        id: appointment.appointment.id,
        start_time: appointment.appointment.start_time,
        end_time: appointment.appointment.end_time,
        userID: appointment.userId,
        status: appointment.appointment.status,
        type: appointment.appointment.type,
      };
    });
  return (
    <div className="w-full p-4">
      {isAppointmentsLoading ? (
        <div className="w-full bg-white flex justify-center items-center h-[256px] rounded-md">
          <div className="animate-spin">
            <LuLoader2 size={48} className="text-primaryGreen" />
          </div>
        </div>
      ) : (
        <DataTable
          data={appointmentsArray ?? []}
          columns={columns}
          filterField="userID"
          filterPlaceholder="Filter by patient name"
          onRowClick={(row) => {
            route.push(
              `/appointments/appointment/${row.appointmentId}${workspaceID ? "?workspace=" + workspaceID : ""}`
            );
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
