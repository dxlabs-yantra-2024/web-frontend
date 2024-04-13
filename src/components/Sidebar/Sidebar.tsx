"use client";
import Image from "next/image";
import Logo from "../../../public/assets/logo.svg";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { IoLogOut, IoSettingsOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { CiFolderOn } from "react-icons/ci";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { PiBagSimple } from "react-icons/pi";
import { Suspense } from "react";

type SidebarItemType = {
  label: string;
  icon: JSX.Element;
  className?: string;
} & (
  | {
      type: "link";
      href: string;
    }
  | {
      type: "button";
      onClick: () => void;
    }
);

const SIDEBAR_ITEMS: SidebarItemType[] = [
  {
    label: "Dashboard",
    icon: <LuLayoutDashboard />,
    href: "/dashboard",
    type: "link",
  },
  {
    label: "Appointments",
    icon: <PiBagSimple />,
    href: "/appointments",
    type: "link",
  },
  {
    label: "Patients",
    icon: <MdOutlinePeopleAlt />,
    href: "/patients",
    type: "link",
  },
  {
    label: "MedBot Assitant",
    icon: <CiFolderOn />,
    href: "/medbot-assistant",
    type: "link",
  },
  {
    label: "Settings",
    icon: <IoSettingsOutline />,
    href: "/settings",
    type: "link",
  },
  {
    label: "Create ABDM",
    icon: <IoSettingsOutline />,
    href: "/create-abdm",
    type: "link",
  },
  {
    label: "Create user card",
    icon: <IoSettingsOutline />,
    href: "/create-user-card",
    type: "link",
  },
];

const SidebarItem = (props: SidebarItemType) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const workspace = searchParams.get("workspace");
  if (props.type === "button") {
    const { label, icon, onClick } = props;
    return (
      <button
        className={`${props.className} flex gap-4 items-center px-4`}
        onClick={onClick}
      >
        {icon} {label}
      </button>
    );
  }
  const isActive = "/" + pathname.split("/")[1] === props.href;
  const { label, icon, href } = props;
  return (
    <Link
      href={workspace ? `${href}?workspace=${workspace}` : href}
      className={`${props.className} flex items-center gap-4 px-4 ${isActive ? "bg-primaryGreen py-5 text-white rounded-12" : "text-black50"}`}
    >
      {icon}
      <p>{label}</p>
    </Link>
  );
};

const Sidebar = () => {
  return (
    <div className="pt-5 pb-8 px-6 gap-12 h-full flex flex-col bg-white">
      <Suspense>
        <Image src={Logo} height={58} alt="logo" />
        <div className="flex-grow flex flex-col justify-between">
          <div className="flex flex-col gap-7">
            {SIDEBAR_ITEMS.map((item) => {
              return <SidebarItem key={item.label} {...item} />;
            })}
          </div>
          <SidebarItem
            type="button"
            onClick={() => {}}
            icon={<IoLogOut color="#CC5F5F" />}
            label="Logout"
            className="text-[#CC5F5F]"
          />
        </div>
      </Suspense>
    </div>
  );
};

export { Sidebar };
