import { ShiftTypes } from "../constants/shiftTypes";

export interface Employee {
  id: string | number;
  name: string;
  department: string;
  departmentId: string | number;
}

export interface ShiftDetails {
  label: string;
  startTime: number;
  endTime: number;
  shiftColor: string;
}

export interface ShiftEvent {
  date: string;
  shiftType: number;
  employee: Employee;
}

export interface Shift {
  shiftId: string | number;
  shiftType: ShiftTypes;
  departmentId: string | number;
}

export interface Department {
  id: string | number;
  name: string;
}

export interface RosterTemplate {
  date: string;
  departments: Department[];
  shifts: Shift[];
}

export interface AssignedEmployee {
  employee: Employee;
  shiftId: number | string;
}

export interface OperaParsedItem {
  activestaff: number;
  dayofweek: number;
  month: number;
  department: number;
  region: number;
  isholiday: number;
  arr: number;
  dep: number;
  stay: number;
  rns: number;
  bns: number;
  rms: number;
  ng: number;
}

export interface OperaPredictResponse {
  predictions: OperaPredict[];
}

export interface OperaPredict {
  day: number[];
  morning: number[];
  night: number[];
}

export interface RosterEmployeeParsedItem {
  employeeId: number;
  age: number;
  yearsOfExperience: number;
  dayOfWeek: number;
  dayOfMonth: number;
  monthOfYear: number;
}

export interface RosterEmployeePredictResponse {
  predictions: ShiftEmployeeScore[];
}

export interface ShiftEmployeeScore {
  [key: string]: [number];
}
