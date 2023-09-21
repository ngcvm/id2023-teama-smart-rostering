/**
 * Application configuration
 */
import { BryntumSchedulerProps } from "@bryntum/scheduler-react";
import { useQuery } from "react-query";
import { getRosterTemplate, postPopulateRosterWithEmployees } from "../apis";
import { useState } from "react";
import { AssignedEmployee, Shift } from "../types";
import { AppConfig } from "../config";
import {
  generatePlaceHolderEvents,
  generatePlaceHolderResources,
} from "../services/schedulerResolver";
import React from "react";
import { useAppSelector } from "./reduxHooks";

type SchedulerConfigHook = {
  configs: BryntumSchedulerProps[];
  populateRosterWithEmployees: () => void;
  isLoading: boolean;
  assignedEmployees: AssignedEmployee[] | undefined;
};

export const useSchedulerConfig = (): SchedulerConfigHook => {
  const [configs, setConfigs] = useState<BryntumSchedulerProps[]>([]);
  const currentDate = useAppSelector((state) => state.app.currentDate);
  const operaData = useAppSelector((state) => state.app.operaData);
  const { data: scheduleTemplate } = useQuery(
    "scheduleTemplate",
    async () => await getRosterTemplate(operaData?.data),
    {
      enabled: !!operaData,
    }
  );

  React.useEffect(() => {
    if (!!scheduleTemplate) {
      const baseDate = new Date(scheduleTemplate?.date as string);
      const shifts = scheduleTemplate?.shifts as Shift[];
      const shiftGroupByDepartmentId = shifts?.reduce((group: any, product) => {
        const { departmentId } = product;
        group[departmentId] = group[departmentId] ?? [];
        group[departmentId].push(product);
        return group;
      }, {});

      const returnConfigs = Object.keys(shiftGroupByDepartmentId)?.map(
        (departmentId: string | number) => {
          const departmentDetails = scheduleTemplate?.departments?.find(
            (x) => x.id?.toString() === departmentId.toString()
          );

          const shifts = shiftGroupByDepartmentId[departmentId];
          const placeholders = generatePlaceHolderResources(shifts);
          const events = generatePlaceHolderEvents(shifts, baseDate);

          return {
            flex: "1 1 50%",
            startDate: new Date(
              baseDate.getFullYear(),
              baseDate.getMonth(),
              baseDate.getDate(),
              AppConfig.startWorkingHour,
              0,
              0
            ),
            endDate: new Date(
              baseDate.getFullYear(),
              baseDate.getMonth(),
              baseDate.getDate(),
              AppConfig.endWorkingHour,
              0,
              0
            ),
            useInitialAnimation: "slide-from-left",
            viewPreset: "hourAndDay",

            barMargin: 10,

            stripeFeature: true,
            sortFeature: true,

            eventDragFeature: {
              constrainDragToTimeline: false,
            },

            columns: [
              {
                text: departmentDetails?.name ?? "N/A",
                width: 150,
                field: "name",
              },
            ],
            resources: placeholders,

            events: events,
            timeRangesFeature: true,
            timeRanges: [
              {
                id: "lunch",
                startDate: new Date(
                  baseDate.getFullYear(),
                  baseDate.getMonth(),
                  baseDate.getDate(),
                  12,
                  0,
                  0
                ),
                endDate: new Date(
                  baseDate.getFullYear(),
                  baseDate.getMonth(),
                  baseDate.getDate(),
                  13,
                  0,
                  0
                ),
                name: "Lunch",
                iconCls: "b-fa b-fa-flag",
              },
              {
                id: "dinner",
                startDate: new Date(
                  baseDate.getFullYear(),
                  baseDate.getMonth(),
                  baseDate.getDate(),
                  18,
                  0,
                  0
                ),
                endDate: new Date(
                  baseDate.getFullYear(),
                  baseDate.getMonth(),
                  baseDate.getDate(),
                  19,
                  0,
                  0
                ),
                name: "Dinner",
                iconCls: "b-fa b-fa-flag",
              },
            ],
          };
        }
      );
      setConfigs(returnConfigs);
    } else {
      setConfigs([]);
    }
  }, [scheduleTemplate]);

  const {
    data: assignedEmployees,
    refetch: populateRosterWithEmployees,
    isLoading,
    isFetching,
    isRefetching,
  } = useQuery(
    ["populateRosterWithEmployees"],
    async (): Promise<AssignedEmployee[] | undefined> => {
      return await postPopulateRosterWithEmployees(scheduleTemplate?.shifts);
    },
    {
      onSuccess: (data) => {
        const nextConfigs = [...configs];
        nextConfigs[0].resources = data?.map((assigned, index) => ({
          id: index,
          name: assigned?.employee?.name,
        }));
        setConfigs(nextConfigs);
        return data;
      },
      onError: (error) => {
        console.log(error);
      },
      enabled: false,
    }
  );

  return {
    configs,
    populateRosterWithEmployees,
    isLoading: isLoading || isFetching || isRefetching,
    assignedEmployees,
  };
};
