import { faker } from "@faker-js/faker";
import { AssignedEmployee, Employee, RosterTemplate, Shift } from "../types";

export const createEmployee = (): Employee => {
  return {
    id: faker.number.int(),
    name: faker.person.fullName(),
    department: "Test",
    departmentId: faker.string.uuid(),
  };
};

export const createRosterTemplate = (): RosterTemplate => {
  return {
    date: new Date().toISOString(),
    departments: [
      {
        id: 0,
        name: "Demo Department",
      },
    ],
    shifts: [
      {
        shiftType: 0,
        departmentId: 0,
      },
      {
        shiftType: 0,
        departmentId: 0,
      },
      {
        shiftType: 0,
        departmentId: 0,
      },
      {
        shiftType: 0,
        departmentId: 0,
      },
      {
        shiftType: 1,
        departmentId: 0,
      },
      {
        shiftType: 1,
        departmentId: 0,
      },
      {
        shiftType: 1,
        departmentId: 0,
      },
      {
        shiftType: 2,
        departmentId: 0,
      },
    ],
  };
};

export const createPopulatedRosterWithEmployees = (
  shifts: Shift[] | undefined
): AssignedEmployee[] | undefined => {
  return shifts?.map((shift, index) => {
    return {
      employee: {
        name: faker.person.fullName(),
        id: index,
        department: "Test",
        departmentId: 0,
      },
      shiftId: index,
    };
  });
};
