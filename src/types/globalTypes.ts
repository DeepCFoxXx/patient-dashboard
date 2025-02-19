export interface Patient {
    patientId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    dateCreated: string;
  }

  export interface ActivityLog {
    patientId: string;
    sessionId: string;
    activityLogId: string;
    activityType: string;
    timestamp: string;
    durationInSeconds: number;
    completedRepCount: number;
    rpeScore: number;
  }

  export interface SessionData {
    totalDuration: number;
    sessionCount: number;
    totalReps: number;
    totalRpeScore: number;
    rpeCount: number;
  }

  export interface LoginFormProps {
    onSubmit: (username: string, password: string) => Promise<void>;
    error: string | null;
  }

  export interface RegistrationFormProps {
    onSubmit: (username: string, password: string) => Promise<void>;
    error?: string | null;
  }


  export type SessionDataMap = Record<string, SessionData>;
