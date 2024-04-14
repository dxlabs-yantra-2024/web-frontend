"use client";

import { Button } from "@/components/Button";
import { DataTable } from "@/components/Table/Table";
import { useGetPatientsByWorkspaceID } from "@/queries/useGetPatientsByWorkspaceID";
import { AppointmentStatus } from "@/types/case";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { RxCaretSort } from "react-icons/rx";

type TAppointmentRow = {
  email: string;
  name: string;
  abhaNumber: string;
  gender: AppointmentStatus;
  // action: React.ReactNode;
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
          Patient Name
          <RxCaretSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    // @ts-ignore
    cell: ({ row }) => <div>#{row.getValue("name")?.slice(0, 6)}</div>,
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
    accessorKey: "gender",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Gender
          <RxCaretSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("gender")}</div>,
  },
  {
    accessorKey: "abhaNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ABHA Number
          <RxCaretSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("abhaNumber")}</div>,
  },
  // {
  //   accessorKey: "action",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Action
  //         <RxCaretSort className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => <div>{row.getValue("action")}</div>,
  // },
];
const Dashboard = () => {
  const searchParams = useSearchParams();
  const workspaceID = searchParams.get("workspace") ?? "";
  const { data: patients, isLoading: isPatientsDataLoading } =
    useGetPatientsByWorkspaceID({
      workspaceID,
    });

  const patientsArray = patients?.data
    ?.filter((patient: any) => !!patient)
    ?.map((patient: any) => {
      return {
        email: patient?.email,
        name: patient?.name,
        abhaNumber: patient?.abhaNumber,
        gender: patient?.gender,
      };
    });
  return (
    <div className="p-4">
      <DataTable
        isLoading={isPatientsDataLoading}
        columns={columns ?? []}
        data={patientsArray ?? []}
        filterField="name"
        filterPlaceholder="Search by name"
      />
    </div>
  );
};

export default Dashboard;
