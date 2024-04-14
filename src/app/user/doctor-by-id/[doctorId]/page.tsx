"use client";

import { Button } from "@/components/Button";
import * as Dialog from "@radix-ui/react-dialog";

import {
  CardWithSeparator,
  CardWithSeparatorTitleText,
} from "@/components/CardWithSeparator";
import { DataTable } from "@/components/Table/Table";
import { useGetDoctorByID } from "@/queries/useGetDoctorByID";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RxCaretSort } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { TextField } from "@/components/TextField";
import { useForm } from "react-hook-form";
import { Calendar } from "@/components/Calendar/calendar";
import useBookAppointment from "@/mutations/useBookAppointment";
import { addHours, format } from "date-fns";

type TAppointmentRow = {
  id: string;
  name: string;
  description: string;
  image: string;
  status: string;
};

const formatDate = (date: Date) => {
  const originalDate = new Date(date);

  // Add 9 hours to set the desired time
  const desiredDate = addHours(originalDate, 9);

  // Format the date
  const formattedDate = format(desiredDate, "yyyy-MM-dd'T'HH:mm:ssX");
  return formattedDate;
};

const Label = ({ children }: { children: string }) => {
  return <label className="text-sm text-primaryGreen">{children}</label>;
};

export const Index = ({
  params,
}: {
  params: {
    doctorId: string;
  };
}) => {
  const [bookedWorkspaces, setBookedWorkspaces] = useState<string[]>([]);

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
      accessorKey: "description",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Description
            <RxCaretSort className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("description")}</div>,
    },

    {
      accessorKey: "image",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Image
            <RxCaretSort className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div>
          <img src={row.getValue("image")} alt="doctor profile" />
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Book Appointment
            <RxCaretSort className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <button
            className="bg-primaryGreen p-2 rounded-md text-white disabled:bg-gray-200 w-full disabled:text-black disabled:cursor-not-allowed"
            disabled={bookedWorkspaces.includes(row.original.id)}
          >
            {bookedWorkspaces.includes(row.original.id)
              ? "Booked"
              : "Book Appointment"}
          </button>
        );
      },
    },
  ];

  const { data: doctor, isLoading: isDoctorLoading } = useGetDoctorByID({
    id: params.doctorId ?? "",
    type: "Patient",
  });
  const doctorsArray = doctor?.data?.workspaces?.map((appointment: any) => {
    return {
      id: appointment.id,
      name: appointment.name,
      description: appointment.description,
      image: appointment.image,
      status: "Available",
    };
  });
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const { mutate: bookAppointment } = useBookAppointment();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSave = (data: any) => {
    const appointment = {
      workspaceId: selectedWorkspace?.id ?? "",
      start_time: formatDate(startDate),
      end_time: formatDate(endDate),
      reason: data.reason,
    };
    bookAppointment(appointment, {
      onSuccess: () => {
        setIsBookingDialogOpen(false);
        setBookedWorkspaces([...bookedWorkspaces, selectedWorkspace?.id]);
      },
    });
  };

  return (
    <div className="p-4">
      <CardWithSeparator
        titleComponent={
          <CardWithSeparatorTitleText>
            {doctor?.data?.doctor?.name ?? ""}
          </CardWithSeparatorTitleText>
        }
        subtext={doctor?.data?.doctor?.bio ?? null}
      >
        <DataTable
          isLoading={isDoctorLoading}
          data={doctorsArray ?? []}
          columns={columns ?? []}
          filterField="name"
          filterPlaceholder="Filter by workspace name"
          onRowClick={(row) => {
            setSelectedWorkspace(row);
            setIsBookingDialogOpen(true);
          }}
        />
      </CardWithSeparator>

      <Dialog.Root
        modal
        onOpenChange={(open) => setIsBookingDialogOpen(open)}
        open={isBookingDialogOpen}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] max-w-[90vw]  translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <div className="flex justify-between">
              <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                Book appointment
              </Dialog.Title>
              <Dialog.Close>
                <button className="IconButton" aria-label="Close">
                  <IoClose size={24} />
                </button>
              </Dialog.Close>
            </div>

            <div className="flex flex-col gap-4">
              <form className="flex flex-col gap-2 ">
                <div className="flex gap-2 ">
                  <div className="flex flex-col gap-2 w-fit">
                    <Label>Start Date</Label>
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => {
                        if (date) {
                          setStartDate(date);
                        }
                      }}
                      className="rounded-md border shadow"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-fit">
                    <Label>End Date</Label>
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => {
                        if (date) {
                          setEndDate(date);
                        }
                      }}
                      className="rounded-md border shadow"
                    />
                  </div>
                </div>
                <div>
                  <TextField
                    name="reason"
                    label="Reason"
                    placeholder="Enter reason"
                    register={register}
                    style={{
                      width: "100%",
                    }}
                  />
                </div>
              </form>
              <div className="flex justify-between gap-4">
                <Dialog.Close className="w-full">
                  <button
                    style={{
                      padding: "4px 2px",
                      border: "black 1px solid",
                      borderRadius: "8px",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Cancel
                  </button>
                </Dialog.Close>

                <button
                  style={{
                    padding: "2px",
                    border: "black 1px solid",
                    borderRadius: "8px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={handleSubmit(onSave)}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default Index;
