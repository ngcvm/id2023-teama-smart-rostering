/**
 * Application configuration
 */
import { BryntumSchedulerProps } from "@bryntum/scheduler-react";

const today = new Date();

export const useSchedulerConfig = () => {
  const schedulerConfig1: BryntumSchedulerProps = {
    flex: "1 1 50%",
    startDate: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      6,
      0,
      0
    ),
    endDate: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
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
        type: "resourceInfo",
        text: "Marvel office",
        width: "15em",
      },
    ],
    resources: [
      { id: 1, name: "Ironman" },
      { id: 2, name: "Thor" },
      { id: 3, name: "Spiderman" },
      { id: 4, name: "Black Widow" },
      { id: 5, name: "Rocket racoon" },
      { id: 6, name: "Starlord" },
    ],

    events: [
      {
        id: 1,
        resourceId: 1,
        name: "Day shift",
        startDate: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          6,
          0,
          0
        ),
        endDate: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          12,
          0,
          0
        ),
        eventColor: "red",
      },
      {
        id: 2,
        resourceId: 2,
        name: "Afternoon shift",
        startDate: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          13,
          0,
          0
        ),
        endDate: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          18,
          0,
          0
        ),
        eventColor: "blue",
      },
      {
        id: 3,
        resourceId: 3,
        name: "Afternoon shift",
        startDate: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          19,
          0,
          0
        ),
        endDate: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          22,
          0,
          0
        ),
        eventColor: "green",
      },
    ],
    timeRangesFeature: true,
    timeRanges: [
      {
        id: "lunch",
        startDate: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          12,
          0,
          0
        ),
        endDate: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
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
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          18,
          0,
          0
        ),
        endDate: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          19,
          0,
          0
        ),
        name: "Dinner",
        iconCls: "b-fa b-fa-flag",
      },
    ],
  };

  const schedulerConfig2: BryntumSchedulerProps = {
    startDate: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      6,
      0,
      0
    ),
    endDate: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      0,
      0
    ),
    useInitialAnimation: "slide-from-left",
    viewPreset: "hourAndDay",
    flex: "1 1 50%",

    barMargin: 10,

    stripeFeature: true,
    sortFeature: true,

    eventDragFeature: {
      constrainDragToTimeline: false,
    },

    columns: [
      {
        type: "resourceInfo",
        text: "DC office",
        width: "15em",
      },
    ],
    resources: [
      { id: 1, name: "Batman" },
      { id: 2, name: "Flash" },
      { id: 3, name: "Superman" },
      { id: 4, name: "Wonder Woman" },
      { id: 5, name: "Aquaman" },
    ],

    events: [
      {
        id: 1,
        resourceId: 1,
        name: "Day shift",
        startDate: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          6,
          0,
          0
        ),
        endDate: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          12,
          0,
          0
        ),
        eventColor: "red",
      },
      {
        id: 2,
        resourceId: 2,
        name: "Afternoon shift",
        startDate: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          13,
          0,
          0
        ),
        endDate: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          18,
          0,
          0
        ),
        eventColor: "blue",
      },
      {
        id: 3,
        resourceId: 3,
        name: "Afternoon shift",
        startDate: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          19,
          0,
          0
        ),
        endDate: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          22,
          0,
          0
        ),
        eventColor: "green",
      },
    ],
    timeRangesFeature: true,
    timeRanges: [
      {
        id: "lunch",
        startDate: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          12,
          0,
          0
        ),
        endDate: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
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
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          18,
          0,
          0
        ),
        endDate: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          19,
          0,
          0
        ),
        name: "Dinner",
        iconCls: "b-fa b-fa-flag",
      },
    ],
  };
  return [schedulerConfig1, schedulerConfig2];
};
