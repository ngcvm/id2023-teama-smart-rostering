import {
  createPopulatedRosterWithEmployees,
  createRosterTemplate,
} from "../mock";
import requestClient from "../services/requestClient";
import { AssignedEmployee, RosterTemplate, Shift } from "../types";

export const getRosterTemplate = async (): Promise<RosterTemplate> => {
  return await new Promise((resolve) =>
    setTimeout(() => resolve(createRosterTemplate()), 1000)
  );
  return await requestClient.get("/roster/template");
};

export const postPopulateRosterWithEmployees = async (
  shifts: Shift[] | undefined
): Promise<AssignedEmployee[] | undefined> => {
  return await new Promise((resolve) =>
    setTimeout(
      () => resolve(createPopulatedRosterWithEmployees(shifts)),
      5 * 1000
    )
  );
  return await requestClient.post("/roster/populate");
};
