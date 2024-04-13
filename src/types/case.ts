export type TCaseDetails = {
  userId: number;
  workspaceId: number;
  reason: string;
  id: number;
};

export type TLabTestDetails = {
  title: string;
  description: string;
  url: string;
};

export type TMedicalHistory = {
  title: string;
  description: string;
  url: string;
};

export type TAttachmentDetails = {
  title: string;
  description: string;
  url: string;
};

export type TVisitDetails = {
  case_id: number;
  start_time: string;
  id: number;
  advices: string;
  notes: string;
  pvt_notes: string;
  reason: string;
  status:
    | "ARRIVAL_PENDING"
    | "IN_QUEUE"
    | "IN_PROGRESS"
    | "PRECHECKUP_PENDING"
    | "COMPLETED";
  price: number;
};

export type TVitalsDetails = {
  blood_pressure: string;
  body_temperature: number;
  body_weight: number;
  diastolic_bp: number;
  peripheral_oxygen_saturation: number;
  pulse: number;
  respiratory_rate: number;
  systolic_bp: number;
};

export type TMedicationDetails = {
  name: string;
  dose: string;
  frequency: string;
  timing: string;
  duration: string;
  start_from: string;
  details: string;
};

export type TSymptomsDetails = {
  name: string;
  severity: number;
  since: string;
  details: string;
};

export type TDiagnosisDetails = {
  name: string;
  since: string;
  status: string;
  details: string;
};

export type TExaminationDetails = {
  name: string;
  details: string;
};

export type TModuleDetails = {
  moduleId: number;
  input: string;
  output: string;
};

export type TServiceDetails = {
  name: string;
  price: number;
  description: string;
};

export type TFollowUpDetails = {
  follow_up_on: string;
  details: string;
};

export type TReferralDetails = {
  doctor_name: string;
  doctor_speciality: string;
  doctor_contact: string;
  details: string;
};
