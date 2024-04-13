// @ts-nocheck
"use client";

import { TextField } from "@/components/TextField";
import { API } from "@/helpers/api/requests";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Dashboard = () => {
  const [finalToken, setFinalToken] = useState("");
  const [healthID, setHealthID] = useState("");
  const [txnId, setTxnId] = useState("");
  const [token, setToken] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [step, setStep] = useState(0);
  const generateOtp = async (mobileNumber: string) => {
    const data = await API.abdm.generateUserOTP(mobileNumber);
    const txnId = data.txnId;
    setTxnId(txnId);
    localStorage.setItem("txtID1", txnId);
  };

  const verifyOtp = async (otp: string) => {
    const _txnId = localStorage.getItem("txtID1");
    const data = await API.abdm.verifyUserOTP(otp, _txnId ?? "");
    const healthIdNumber = data.mobileLinkedHid[0].healthIdNumber;
    localStorage.setItem("healthId", healthIdNumber);
    localStorage.setItem("token2", data.token);
    localStorage.setItem("txnId2", data.txnId);
    setHealthID(healthIdNumber);
    setToken(data.token);
    setTxnId(data.txnId);
  };

  const genAuthToken = async () => {
    const _healthID = localStorage.getItem("healthId");
    const _txnId = localStorage.getItem("txnId2");
    const _token = localStorage.getItem("token2");
    const data = await API.abdm.generateAuthToken(
      _healthID ?? "",
      _txnId ?? "",
      _token ?? ""
    );
    console.log(data);
    const finalToken = data.token;
    localStorage.setItem("finalToken", finalToken);
    setFinalToken(finalToken);
  };

  const getCard = async () => {
    const _finalToken = localStorage.getItem("finalToken");
    const _data = await API.abdm.getCard(_finalToken ?? "");
    console.log("getcard", _data);
    let base64ImageString = Buffer.from(_data.data, "binary").toString(
      "base64"
    );
    let binaryString = window.atob(base64ImageString);
    let binaryLen = binaryString.length;
    let bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      let ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    let blob = new Blob([bytes], { type: "application/pdf" });
    let link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "_ABDM_Card.pdf";
    link.click();
    localStorage.setItem("cardToken", _data.abdmToken);
    console.log(_data);
  };

  useEffect(() => {
    console.log({
      finalToken,
      healthID,
      token,
    });
  }, [finalToken, healthID, token]);
  const handleFormSubmit = async (formData: any) => {
    if (step === 0) {
      await generateOtp(formData.mobileNumber);
      setStep(1);
    } else if (step === 1) {
      await verifyOtp(formData.otp);
      await genAuthToken();
      const data = await getCard();
      console.log(data);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-col gap-2">
        {step == 0 && (
          <TextField
            label="Mobile number"
            name="mobileNumber"
            register={register}
          />
        )}
        {step == 1 && <TextField label="otp" name="otp" register={register} />}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-fit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Dashboard;

// "eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiI5MS00NTQ3LTcxMTYtNDI1NyIsImNsaWVudElkIjoiU0JYXzAwNjU4MiIsInN5c3RlbSI6IkFCSEEtTiIsIm1vYmlsZSI6IjczMzA3ODc2MjUiLCJleHAiOjE3MTMwMzczMDgsImhlYWx0aElkTnVtYmVyIjoiOTEtNDU0Ny03MTE2LTQyNTciLCJpYXQiOjE3MTMwMzU1MDh9.CG2a9pu1-uURbBCdd4s4K8WyDePfJ23FadmuOAkZmqmfCdCQ0W-vGguMwrs6kbau9jFnboCb0CDniZBuRVylpZAP2X_Px3w8A9SVQgALf6ckyOdPakf3ZkLtv6gGUhDqqTSxDox8wS2-lPT7SyY-4MuQRmhv0QhqTXfdo8t4nwQ51-eQN6u_K34Ud_o1uhf-NjYP-V4hfXJQTETuYEWvcHOfx3Ixrv7gTmdMz36ssbJfgPaJwPQIWx1WjuwNd6GDv8ihd2sqQUk1npnU_WwszdD4VnJ8GnaVJ5SJ2JldacZQRXpjDR12JETZd478Yh9c93zv7hwBrdXcM04GpAw_P-QPuDuS_fhnC30069dMGeACBS2EXfeKWBSVqSjO96oQWupZnHJ1M6ep1_OWFNrUf7ntGxQ10d72zqu-nr9RUINSb-zUsQgiJ4Sn1abUGGnsf43ffDbJx_fZqmvboEhyI3yWv2OwqawYowNX8rRElva5B1mEv9lbIfIB26_nHwWntuqp4D5BzGH2QFoZyA-NpWZilMFKd--tPigfRfHdSNxF5WPz8VFeYL38OjpIGLQ8eBiFgA79NyCWs3kh1xn2dJdPHx9Xhkq3Ck5uwo3207rz0Vx2WS77zLqRp5oPvVluIEhnQ479kc5mp0xuFGZBNL4jHjfdH81MczEq7sWZAEw"
