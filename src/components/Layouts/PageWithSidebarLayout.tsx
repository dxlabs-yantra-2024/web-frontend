"use client";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { usePathname } from "next/navigation";
import { GoHomeFill } from "react-icons/go";
import { IoNotifications } from "react-icons/io5";
import { WorkspaceDialog } from "../WorkspaceDialog/WorkspaceDialog";
import { RxAvatar } from "react-icons/rx";
import { NoWorkspaceWarning } from "@/components/NoWorkspaceWarning";

const BREADCRUMB_LABEL: Record<string, string> = {
  appointments: "Appointments",
  patients: "Patients",
  "medbot-assistant": "MedBot Assistant",
  settings: "Settings",
};

const PageWithSidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const currentPath = pathname?.split("/")[1];
  return (
    <div className="min-h-full h-full min-w-full w-full flex relative">
      <div className="fixed top-0 h-[100vh]">
        <Sidebar />
      </div>
      <NoWorkspaceWarning />
      <div className="flex-grow ml-[246px]">
        <div className="flex flex-col">
          <div className="flex flex-col bg-white">
            <div className="px-5 py-3 flex justify-between border-b-2 border-gray-200 items-center ">
              <h1 className="text-20 font-semibold">Dashboard</h1>
              <div className="flex gap-5 items-center">
                <div>
                  <WorkspaceDialog />
                </div>
                <IoNotifications className="text-primaryGreen" size={20} />
                <RxAvatar size={20} />
              </div>
            </div>
            <div className="px-5 py-1 flex items-center gap-3">
              <GoHomeFill className="fill-primaryGreen" size={20} />
              <p className="text-sm text-black30 flex items-center ">
                {BREADCRUMB_LABEL?.[currentPath] && (
                  <> / &nbsp; {BREADCRUMB_LABEL[currentPath]}</>
                )}
              </p>
            </div>
          </div>

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export { PageWithSidebarLayout };
