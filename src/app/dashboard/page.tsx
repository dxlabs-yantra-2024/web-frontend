"use client";
import Image from "next/image";
import d from "../../../public/dashboard.svg";
const Dashboard = () => {
  return (
    <div className="p-4">
      <Image src={d} alt="dashboard" />
    </div>
  );
};

export default Dashboard;
