"use client";

import useGenerateABDMOTP from "@/mutations/useGenerateABDMOtp";

const Dashboard = () => {
  const { mutate: generateABDMOTP } = useGenerateABDMOTP();
  return (
    <div className="">
      <button
        onClick={() => {
          generateABDMOTP("587766108384");
        }}
      >
        asd
      </button>
    </div>
  );
};

export default Dashboard;
