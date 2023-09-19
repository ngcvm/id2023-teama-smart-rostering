import { ShiftTypes } from "../constants/shiftTypes";
import { Shift, ShiftDetails } from "../types";
import { ResourceModel, ResourceModelConfig } from "@bryntum/scheduler";

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
