"use client";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { usePathname } from "next/navigation";
import { GoHomeFill } from "react-icons/go";
import { IoNotifications } from "react-icons/io5";

const BREADCRUMB_LABEL: Record<string, string> = {
  "/appointments": "Appointments",
  "/patients": "Patients",
  "/medbot-assistant": "MedBot Assistant",
  "/settings": "Settings",
};

const PageWithSidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className="min-h-full h-full min-w-full w-full flex">
      <Sidebar />
      <div className="flex-grow ">
        <div className="flex flex-col">
          <div className="flex flex-col bg-white">
            <div className="px-5 py-3 flex justify-between border-b-2 border-gray-200 items-center ">
              <h1 className="text-20 font-semibold">Dashboard</h1>
              <div className="flex gap-5 items-center">
                <div> Workspace</div>
                <IoNotifications className="text-primaryGreen" size={20} />
                <div>Avatar</div>
              </div>
            </div>
            <div className="px-5 py-1 flex items-center gap-3">
              <GoHomeFill className="fill-primaryGreen" size={20} />
              <p className="text-sm text-black30 flex items-center ">
                {BREADCRUMB_LABEL?.[pathname] && (
                  <> / &nbsp; {BREADCRUMB_LABEL[pathname]}</>
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
