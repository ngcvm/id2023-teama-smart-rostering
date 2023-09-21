import { createPopulatedRosterWithEmployees } from "../mock";
import requestClient, { apiUrl, sigv4 } from "../services/requestClient";
import {
  generateRosterTemplates,
  getDateFromDayOfWeek,
} from "../services/schedulerResolver";
import {
  AssignedEmployee,
  OperaParsedItem,
  RosterTemplate,
  Shift,
} from "../types";
import { AxiosRequestConfig } from "axios";

const generateOperaPayload = (operaData: OperaParsedItem) => {
  if (!operaData) return null;
  return [
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
  shifts: Shift[] | undefined
): Promise<AssignedEmployee[] | undefined> => {
  return await new Promise((resolve) =>
    setTimeout(
      () => resolve(createPopulatedRosterWithEmployees(shifts)),
      5 * 1000
    )
  );
  // eslint-disable-next-line no-unreachable
  return await requestClient.post(
    "/tensorflow-inference-2023-09-21-04-14-40-774/invocations"
  );
};
