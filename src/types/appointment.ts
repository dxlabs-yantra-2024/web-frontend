enum AppointmentStatus {}
// Define enum values for AppointmentStatus

enum AppointmentType {}
// Define enum values for AppointmentType

interface Vitals {
  // Define the structure of Vitals object if needed
}

interface Medications {
  // Define the structure of Medications object if needed
}

interface Symptoms {
  // Define the structure of Symptoms object if needed
}

export type TAppointment = {
  id: string; // Assuming this is a string type for _id
  start_time: Date;
  end_time: Date;
  status: AppointmentStatus;
  type: AppointmentType;
  visit_number?: string;
  case_id?: number;
  appointmentId?: number;
  doctorId?: number;

  reason?: string;
  advices?: string;
  notes?: string;
  favorite: boolean;
  pvt_notes?: string;
  price?: number;

  chief_complaint?: string;
  history?: string;
  examination_plan?: string;
  management_plan?: string;
  diff_diagnosis?: string;
  lab_reports?: string;

  vitals: Vitals[];
  medications: Medications[];

  symptoms: Symptoms[];
  diagnosis?: string;

  created_at: Date;
  updated_at: Date;
};
