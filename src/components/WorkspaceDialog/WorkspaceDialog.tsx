"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { TextField } from "../TextField";
import { useState } from "react";
import useCreateWorkspace from "@/mutations/useCreateWorkspace";
import {
  getMyWorkspacesQueryKey,
  useGetMyWorkspaces,
} from "@/queries/useGetMyWorkspaces";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

const WorkspaceDialog = () => {
  const [isWorkspaceDialogOpen, setCreateWorkspaceDialogOpen] = useState(false);
  const { mutate: createWorkspace } = useCreateWorkspace();
  const queryClient = useQueryClient();
  const { data: myWorkspaces } = useGetMyWorkspaces();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSave = (data: any) => {
    createWorkspace(data.workspaceName, {
      onSuccess: () => {
        // @ts-ignore
        queryClient.invalidateQueries(getMyWorkspacesQueryKey());
        reset();
        setCreateWorkspaceDialogOpen(false);
      },
    });
  };

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="" aria-label="Customise options">
            Workspaces
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            sideOffset={5}
          >
            {myWorkspaces?.data?.length === 0 ? (
              <>
                <h1>No workspaces</h1>
              </>
            ) : (
              <>
                {myWorkspaces?.data?.map((workspace: any, index: number) => (
                  <Link href="/" key={workspace.id}>
                    <DropdownMenu.Item className="group text-[13px] leading-none text-black rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-primaryGreen data-[highlighted]:text-violet1">
                      {workspace.name
                        ? `${index + 1} - ${workspace.name}`
                        : "Untitled Workspace"}
                    </DropdownMenu.Item>
                  </Link>
                ))}
              </>
            )}

            <DropdownMenu.Separator className="h-[1px] bg-violet6 m-[5px]" />

            <DropdownMenu.Item className="group text-[13px] leading-none text-black rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-primaryGreen data-[highlighted]:text-violet1">
              <button onClick={() => setCreateWorkspaceDialogOpen(true)}>
                + Create workspace
              </button>
            </DropdownMenu.Item>

            <DropdownMenu.Arrow className="fill-white" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <Dialog.Root
        modal
        onOpenChange={(open) => setCreateWorkspaceDialogOpen(open)}
        open={isWorkspaceDialogOpen}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <div className="flex justify-between">
              <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                Create Workspace
              </Dialog.Title>
              <Dialog.Close>
                <button className="IconButton" aria-label="Close">
                  <IoClose size={24} />
                </button>
              </Dialog.Close>
            </div>

            <div className="flex flex-col gap-4">
              <form>
                <TextField
                  name="workspaceName"
                  label="Workspace Name"
                  placeholder="Enter workspace name"
                  register={register}
                  style={{
                    width: "100%",
                  }}
                />
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
                  Create workspace
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export { WorkspaceDialog };
