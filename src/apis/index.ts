import requestClient, { apiUrl, sigv4 } from "../services/requestClient";
import {
  assignStaffsToShifts,
  generateRosterTemplates,
  getDateFromDayOfWeek,
} from "../services/schedulerResolver";
import {
  AssignedEmployee,
  OperaParsedItem,
  RosterEmployeeParsedItem,
  RosterEmployeePredictResponse,
  RosterTemplate,
  Shift,
} from "../types";
import { AxiosRequestConfig } from "axios";

const generateOperaPayload = (operaData: OperaParsedItem) => {
  if (!operaData) return null;
  return [
    [
      parseInt(operaData.activestaff as unknown as string),
      parseInt(operaData.dayofweek as unknown as string),
      parseInt(operaData.month as unknown as string),
      parseInt(operaData.department as unknown as string),
      parseInt(operaData.region as unknown as string),
      parseInt(operaData.isholiday as unknown as string),
      parseInt(operaData.arr as unknown as string),
      parseInt(operaData.dep as unknown as string),
      parseInt(operaData.stay as unknown as string),
      parseInt(operaData.rns as unknown as string),
      parseInt(operaData.bns as unknown as string),
      parseInt(operaData.rms as unknown as string),
      parseInt(operaData.ng as unknown as string),
    ],
  ];
};

export const getRosterTemplate = async (
  operaData: OperaParsedItem[]
): Promise<RosterTemplate> => {
  const actualOperaData = operaData[0];
  const signed = await sigv4.sign(
    {
      method: "POST",
      hostname: apiUrl.hostname,
      path:
        apiUrl.pathname +
        "/tensorflow-inference-2023-09-21-03-48-26-094/invocations",
      protocol: apiUrl.protocol,
      headers: {
        "Content-Type": "application/json",
        host: apiUrl.hostname, // compulsory
      },
      body: JSON.stringify(generateOperaPayload(actualOperaData) || []),
    },
    { signingDate: new Date() }
  );

  try {
    const config = {
      method: "post",
      url: "/tensorflow-inference-2023-09-21-03-48-26-094/invocations",
      data: signed.body,
      headers: signed.headers,
    };

    const { data } = await requestClient(config as AxiosRequestConfig);

    const prediction = data?.predictions[0];
    const rosterDate = getDateFromDayOfWeek(actualOperaData.dayofweek);

    const rosterTemplates = generateRosterTemplates(
      prediction,
      rosterDate,
      actualOperaData.department
    );

    return rosterTemplates;
  } catch (error) {
    console.log("An error occurred", error);

    throw error;
  }
};

export const postPopulateRosterWithEmployees = async (
  shifts: Shift[] | undefined,
  staffs: RosterEmployeeParsedItem[]
): Promise<AssignedEmployee[] | undefined> => {
  // return await new Promise((resolve) =>
  //   setTimeout(
  //     () => resolve(createPopulatedRosterWithEmployees(shifts)),
  //     5 * 1000
  //   )
  // );
  const actualOperaData = [
    ...staffs.map((staff) => generateStaffShiftAssignmentPayload(staff)),
  ]?.filter((item) => item !== null);
  console.log(actualOperaData);
  const signed = await sigv4.sign(
    {
      method: "POST",
      hostname: apiUrl.hostname,
      path:
        apiUrl.pathname +
        "/tensorflow-inference-2023-09-21-04-14-40-774/invocations",
      protocol: apiUrl.protocol,
      headers: {
        "Content-Type": "application/json",
        host: apiUrl.hostname, // compulsory
      },
      body: JSON.stringify(actualOperaData || []),
    },
    { signingDate: new Date() }
  );

  try {
    const config = {
      method: "post",
      url: "/tensorflow-inference-2023-09-21-04-14-40-774/invocations",
      data: signed.body,
      headers: signed.headers,
    };

    const { data } = await requestClient(config as AxiosRequestConfig);

    const prediction =
      data?.predictions as RosterEmployeePredictResponse["predictions"];
    const staffIds =
      actualOperaData
        ?.map((item) => (item ? item[0] : null))
        ?.filter((x) => x != null) || [];

    const populatedRosterWithEmployee = assignStaffsToShifts(
      staffIds as number[],
      shifts as Shift[],
      prediction
    );

    console.log(populatedRosterWithEmployee);

    return populatedRosterWithEmployee;
  } catch (error) {
    console.log("An error occurred", error);

    throw error;
  }
};

const generateStaffShiftAssignmentPayload = (
  item: RosterEmployeeParsedItem
) => {
  if (!item || !item.employeeId) return null;
  return [
    item.employeeId,
    item.age,
    item.yearsOfExperience,
    item.dayOfWeek,
    item.dayOfMonth,
    item.monthOfYear,
  ];
};
