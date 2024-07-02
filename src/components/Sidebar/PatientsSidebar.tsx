"use client";
import Image from "next/image";
import Logo from "../../../public/assets/logo.svg";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { IoLogOut } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiBagSimple } from "react-icons/pi";

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
    label: "Doctors",
    icon: <LuLayoutDashboard />,
    href: "/user/all-doctors",
    type: "link",
  },
  {
    label: "Appointments",
    icon: <PiBagSimple />,
    href: "/user/all-appointments",
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
  const isActive =
    "/" + pathname.split("/")[1] + "/" + pathname.split("/")[2] === props.href;
  const { label, icon, href } = props;
  return (
    <Link
      href={workspace ? `${href}?workspace=${workspace}` : href}
      className={`${props.className} flex items-center gap-4 px-4 ${
        isActive ? "bg-primaryGreen py-5 text-white rounded-12" : "text-black50"
      }`}
    >
      {icon}
      <p>{label}</p>
    </Link>
  );
};

const PatientsSidebar = () => {
  return (
    <div className="pt-5 pb-8 px-6 gap-12 h-full flex flex-col bg-white">
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
    </div>
  );
};

export { PatientsSidebar };
