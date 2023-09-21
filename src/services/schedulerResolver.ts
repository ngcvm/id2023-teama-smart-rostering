import { addDays } from "date-fns";
import { ShiftTypes } from "../constants/shiftTypes";
import {
  AssignedEmployee,
  OperaPredict,
  Shift,
  ShiftDetails,
  ShiftEmployeeScore,
} from "../types";
import { ResourceModel, ResourceModelConfig } from "@bryntum/scheduler";
import { Departments } from "../constants/departments";
import { faker } from "@faker-js/faker";

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
      shiftId: faker.string.uuid(),
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

const getShiftPredictKey = (shiftTypes: ShiftTypes) => {
  return `y${shiftTypes + 1}`;
};

export const assignStaffsToShifts = (
  staffIds: number[],
  shifts: Shift[],
  predictions: ShiftEmployeeScore[]
): AssignedEmployee[] | undefined => {
  return shifts.map((shift, index) => {
    const shiftPredictKey = getShiftPredictKey(shift.shiftType);
    const staffIndex = getStaffIndexBasedOnShiftScore(
      shiftPredictKey,
      predictions
    );

    predictions[staffIndex][shiftPredictKey] = [-99999999];

    return {
      employee: {
        name: `User #${staffIds[staffIndex]}`,
        id: staffIds[staffIndex],
        deparment: "Housekeeping",
        departmentId: 1,
      },
      shiftId: shift.shiftId,
    } as unknown as AssignedEmployee;
  }) as AssignedEmployee[];
};

export const getStaffIndexBasedOnShiftScore = (
  shiftTypePredictKey: string, // y1, y2, y3
  prediction: ShiftEmployeeScore[]
): number => {
  // Return index of the staff with highest y1 score
  const staffIndex = prediction.findIndex((item) => {
    const highestScore = Math.max(
      ...prediction.map((item) => item[shiftTypePredictKey][0])
    ).toString();
    const currentScore = item[shiftTypePredictKey].toString();
    console.log(currentScore, highestScore);

    return (
      currentScore ===
      Math.max(
        ...prediction.map((item) => item[shiftTypePredictKey][0])
      )?.toString()
    );
  });

  console.log(staffIndex);

  return staffIndex;
};
