export interface WorkType {
  id: number;
  name: string;
  nameGt5: string;
  nameLt5: string;
  nameOne: string;
}

export interface Shift {
  id: string;
  logo: string;
  address: string;
  companyName: string;
  dateStartByCity: string;
  timeStartByCity: string;
  timeEndByCity: string;
  currentWorkers: number;
  planWorkers: number;
  workTypes: WorkType[];
  priceWorker: number;
  customerFeedbacksCount: string;
  customerRating: number | null;
}

export interface ShiftsResponse {
  data: Shift[];
  status: number;
}

