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
