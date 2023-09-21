import { addDays, startOfWeek } from "date-fns";
import { ShiftTypes } from "../constants/shiftTypes";
import { OperaPredict, Shift, ShiftDetails } from "../types";
import { ResourceModel, ResourceModelConfig } from "@bryntum/scheduler";
import { Departments } from "../constants/departments";

export const MorningShift: ShiftDetails = {
  label: "Morning Shift",
  startTime: 8,
  endTime: 12,
  shiftColor: "green",
};

export const AfternoonShift: ShiftDetails = {
  label: "Afternoon Shift",
  startTime: 13,
  endTime: 17,
  shiftColor: "orange",
};

export const NightShift: ShiftDetails = {
  label: "Night Shift",
  startTime: 19,
  endTime: 23,
  shiftColor: "red",
};

const getShiftTypesDetails = (shiftType: ShiftTypes) => {
  switch (shiftType) {
    case ShiftTypes.MORNING:
      return MorningShift;
    case ShiftTypes.AFTERNOON:
      return AfternoonShift;
    case ShiftTypes.NIGHT:
      return NightShift;
    default:
      return MorningShift;
  }
};

export const generatePlaceHolderResources = (
  shifts: Shift[]
): ResourceModel[] | Partial<ResourceModelConfig>[] => {
  if (!shifts) {
    return [];
  }
  return shifts.map((shift, index) => {
    return { id: index, name: "" };
  });
};

export const generatePlaceHolderEvents = (shifts: Shift[], baseDate: Date) => {
  if (!shifts) {
    return [];
  }

  const events = shifts.map((shift, index) => {
    const shiftTypesDetail = getShiftTypesDetails(shift.shiftType);
    return {
      id: index,
      resourceId: index,
      name: shiftTypesDetail.label,
      startDate: new Date(
        baseDate.getFullYear(),
        baseDate.getMonth(),
        baseDate.getDate(),
        shiftTypesDetail.startTime,
        0,
        0
      ),
      endDate: new Date(
        baseDate.getFullYear(),
        baseDate.getMonth(),
        baseDate.getDate(),
        shiftTypesDetail.endTime,
        0,
        0
      ),
      eventColor: shiftTypesDetail.shiftColor,
    };
  });

  return events;
};

const getDepartmentName = (departmentId: number) => {
  return Departments[departmentId] || "Housekeeping";
};

const generateRoster = (
  shiftType: ShiftTypes,
  departmentId: number,
  numberOfShift: number
) => {
  let result = [];
  for (let i = 0; i < numberOfShift; i++) {
    result.push({
      shiftType: shiftType,
      departmentId: departmentId,
    });
  }
  return result;
};

export const generateRosterTemplates = (
  prediction: OperaPredict,
  date: Date,
  departmentId: any
) => {
  const morningShiftsCount = Math.round(prediction.morning[0]);
  const afternoonShiftsCount = Math.round(prediction.day[0]);
  const nightShiftsCount = Math.round(prediction.night[0]);
  console.log("morningShiftsCount", morningShiftsCount);
  console.log("afternoonShiftsCount", afternoonShiftsCount);
  console.log("nightShiftsCount", nightShiftsCount);
  return {
    date: date.toString(),
    departments: [
      {
        id: departmentId,
        name: getDepartmentName(departmentId),
      },
    ],
    shifts: [
      ...generateRoster(ShiftTypes.MORNING, departmentId, morningShiftsCount),
      ...generateRoster(
        ShiftTypes.AFTERNOON,
        departmentId,
        afternoonShiftsCount
      ),
      ...generateRoster(ShiftTypes.NIGHT, departmentId, nightShiftsCount),
    ],
  };
};

// Write a function to return the exact date from a day of week
// e.g. if today is 2021-09-21 (Tuesday), and the day of week is 3 (Thursday), then the function should return 2021-09-23 (Thursday)

export const getDateFromDayOfWeek = (dayOfWeek: number) => {
  const todayNextWeek = addDays(new Date(), 7);
  const todyNextWeekDayOfWeek = todayNextWeek.getDay();

  const diff = dayOfWeek - todyNextWeekDayOfWeek;

  if (diff > 0) {
    return addDays(todayNextWeek, diff);
  } else {
    return addDays(todayNextWeek, 7 + diff);
  }
};
