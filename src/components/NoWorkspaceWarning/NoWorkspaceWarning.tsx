"use client";

import { useSearchParams } from "next/navigation";

export const NoWorkspaceWarning = () => {
  const searchParams = useSearchParams();
  const workspaceID = searchParams.get("workspace");
  if (workspaceID) return null;

  return (
    <div className="w-full h-full fixed z-1  bg-black bg-opacity-50 mt-[80px] backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-2xl font-bold text-white">
          No workspace selected
        </div>
        <div className="text-lg text-white">
          Please select a workspace to view appointments
        </div>
      </div>
    </div>
  );
};
