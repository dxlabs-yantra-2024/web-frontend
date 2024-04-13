import { ENV } from "@/constants/env";
import axios, { AxiosRequestConfig } from "axios";
import { TDoctor } from "@/types/doctor";
import { TWorkspace } from "@/types/workspace";
import {
  TAttachmentDetails,
  TCaseDetails,
  TDiagnosisDetails,
  TExaminationDetails,
  TFollowUpDetails,
  TLabTestDetails,
  TMedicalHistory,
  TMedicationDetails,
  TModuleDetails,
  TReferralDetails,
  TServiceDetails,
  TSymptomsDetails,
  TVisitDetails,
  TVitalsDetails,
} from "@/types/case";
import { TEditAppointment } from "@/mutations/useEditAppointment";
import { TAppointment } from "@/types/appointment";
const instance = axios.create();

export const requests = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    instance.get<T>(`${ENV.API_ROOT}${url}`, config).then(({ data }) => data),
  post: <T, Q>(
    url: string,
    body?: T,
    config?: AxiosRequestConfig
  ): Promise<Q> =>
    instance
      .post<Q>(`${ENV.API_ROOT}${url}`, body, config)
      .then(({ data }) => data),
  put: <T, Q>(url: string, body?: T): Promise<Q> =>
    instance.put<Q>(`${ENV.API_ROOT}${url}`, body).then(({ data }) => data),
  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    instance
      .delete<T>(`${ENV.API_ROOT}${url}`, config)
      .then(({ data }) => data),
  deleteWithData: <T, Q>(url: string, body?: T): Promise<Q> =>
    instance
      .delete<Q>(`${ENV.API_ROOT}${url}`, { data: body })
      .then(({ data }) => data),
  patch: <T, Q>(
    url: string,
    body?: T,
    config?: AxiosRequestConfig
  ): Promise<Q> =>
    instance
      .patch<Q>(`${ENV.API_ROOT}${url}`, body, config)
      .then(({ data }) => data),
};

export const API = {
  doctors: {
    getDoctorByID: (id: string) => requests.get(`/doctors/${id}`),
    createDoctor: ({
      name,
      username,
      email,
      password,
    }: Pick<TDoctor, "name" | "username" | "email" | "password">) =>
      requests.post("/doctors/signup", {
        email,
        name,
        password,
        username,
      }),
    getOTP: (mobileNumber: string, token: string) =>
      requests.post(
        "/doctors/getotp",
        {
          mobile_number: mobileNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    verifyOTP: (otp: number, token: string) =>
      requests.post(
        "/doctors/verifyotp",
        {
          otp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    login: (email: string, password: string) =>
      requests.post("/doctors/login", {
        email,
        password,
      }),
    getMe: (token: string) =>
      requests.get("/doctors/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  },
  workspaces: {
    createWorkspace: (workspaceName: TWorkspace["name"], token: string) =>
      requests.post(
        "/workspaces",
        {
          name: workspaceName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    getWorkspaceByID: (id: string, token: string) =>
      requests.get(`/workspaces/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    getWorkspaceByOrganizationID: (orgID: string) =>
      requests.get(`/workspaces/org/${orgID}`),
    editWorkspace: (workspaceDetails: TWorkspace) =>
      requests.patch(`/workspaces/${workspaceDetails.id}`, workspaceDetails),
    getWorkspaces: (token: string) =>
      requests.get<any>("/workspaces", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    getAppointmentByWorkspaceID: (workspaceID: string, token: string) =>
      requests.get<any>(
        `/workspaces/${workspaceID ? workspaceID + "/" : ""}appointments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    getAppointmentByID: (id: string, token: string) =>
      requests.get<any>(`/workspaces/appointments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    editAppointment: (
      appointmentDetails: TEditAppointment,
      appointmentId: TAppointment["appointmentId"],
      token: string
    ) =>
      requests.patch(
        `/workspaces/appointments/${appointmentId}`,
        appointmentDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    getPatientAppointmentByID: (userID: string, token: string) =>
      requests.get<any>(`/workspaces/patients/${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    getPatients: (workspaceID: string, token: string) =>
      requests.get<any>(
        `/workspaces/${workspaceID ? workspaceID + "/" : ""}patients`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
  },
  cases: {
    createCase: (
      caseDetails: Pick<TCaseDetails, "userId" | "workspaceId" | "reason">
    ) => requests.post("/cases", caseDetails),
    getCases: () => requests.get("/cases"),
    addFavCase: (caseID: string) => requests.post(`/cases/favorites/${caseID}`),
    editCase: (caseDetails: any) =>
      requests.patch(`/cases/${caseDetails.id}`, caseDetails),
    getCaseByWorkspaceID: (workspaceID: string) =>
      requests.get(`/cases/workspace/${workspaceID}`),
    getUserByCaseID: (caseID: string) => requests.get(`/cases/${caseID}/user`),
    getCaseByID: (caseID: string) => requests.get(`/cases/${caseID}`),
    // medicalAssistant:
    uploadFile: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return requests.post("/modules/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    addLabTest: (labTestDetails: TLabTestDetails, id: string) =>
      requests.post(`/cases/lab/${id}`, labTestDetails),
    getLabTest: (id: string) => requests.get(`/cases/lab/${id}`),
    createMedicalHistory: (medicalHistory: TMedicalHistory, id: string) =>
      requests.post(`/cases/history/${id}`, medicalHistory),
    createAttachment: (attachment: TAttachmentDetails, id: string) =>
      requests.post(`/cases/attachments/${id}`, attachment),
  },
  visits: {
    getVisitByID: (id: string) => requests.get(`/cases/visits/${id}`),
    getVisitByCaseID: (caseID: string) =>
      requests.get(`/cases/visits/case/${caseID}`),
    getVisitByWorkspaceID: (workspaceID: string) =>
      requests.get(`/cases/visits/workspace/${workspaceID}`),
    editVisit: (visitDetails: TVisitDetails) =>
      requests.patch(`/cases/visits/${visitDetails.id}`, visitDetails),
    addVitals: (vitals: TVitalsDetails, visitID: string) =>
      requests.post(`/cases/visits/visit/${visitID}/vitals`, vitals),
    addMedications: (medications: TMedicationDetails, visitID: string) =>
      requests.post(`/cases/visit/${visitID}/medications`, medications),
    addSymptoms: (symptoms: TSymptomsDetails, visitID: string) =>
      requests.post(`/cases/visit/${visitID}/symptoms`, symptoms),
    addDiagnosis: (diagnosis: TDiagnosisDetails, visitID: string) =>
      requests.post(`/cases/visit/${visitID}/diagnosis`, diagnosis),
    addExaminations: (examination: TExaminationDetails, visitID: string) =>
      requests.post(`/cases/visit/${visitID}/examinations`, examination),
    addModules: (module: TModuleDetails, visitID: string) =>
      requests.post(`/cases/visit/${visitID}/modules`, module),
    addService: (service: TServiceDetails, visitID: string) =>
      requests.post(`/cases/visit/${visitID}/services`, service),
    addFollowUps: (followUps: TFollowUpDetails, visitID: string) =>
      requests.post(`/cases/visit/${visitID}/followups`, followUps),
    addReferrals: (referrals: TReferralDetails, visitID: string) =>
      requests.post(`/cases/visit/${visitID}/referrals`, referrals),
    createVisit: (
      visitDetails: Pick<
        TVisitDetails,
        "case_id" | "reason" | "start_time" | "status"
      >
    ) => requests.post("/cases/visits", visitDetails),
  },
  abdm: {
    generateOTP: (aadhaarNumber: string) =>
      requests.post("/abdm/registration/aadhaar/generateOtp", {
        aadhaarNumber,
      }),
    verifyOTP: (otp: string, txnId: string) =>
      requests.post("/abdm/registration/aadhaar/verifyOtp", {
        otp,
        txnId,
      }),
    generateUserOTP: (mobileNumber: string) =>
      requests.post("/abdm/registration/mobile/login/generateOtp", {
        mobile: mobileNumber,
      }),
    verifyUserOTP: (otp: string, txnId: string) =>
      requests.post("/abdm/registration/mobile/login/verifyOtp", {
        otp,
        txnId,
      }),
    generateAuthToken: (healthId: string, txnId: string, Token: string) =>
      requests.post("/abdm/registration/mobile/login/userAuthorizedToken", {
        healthId,
        txnId,
        Token,
      }),

    getCard: (token: string) =>
      requests.post(
        "/abdm/account/getCard",
        {
          abdmToken: token,
        },
        {
          headers: {
            "X-Token": token,
          },
        }
      ),
    createUserAfterABDM: (txnId: string) =>
      requests.post("/abdm/registration/aadhaar/createHealthIdByAdhaar", {
        txnId,
      }),
    mobileOTP: (txnId: string, mobileNumber: string) =>
      requests.post("/abdm/registration/aadhaar/checkAndGenerateMobileOTP", {
        txnId,
        mobile: mobileNumber,
      }),
  },
};
