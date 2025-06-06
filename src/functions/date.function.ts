import { DaysOfWeek } from "../constants/app.constants";
import type { WeekType } from "../constants/app.types";

export const getSimplifiedDate = (date: Date): string => {
  const d = date.toDateString().split(" ");

  return `${d[2]} ${d[1]}`;
};

export const getWeek = (today: Date = new Date()): WeekType => {
  const week: WeekType = {};
  const weekStart = new Date(today);
  let i = 0;

  weekStart.setDate(weekStart.getDate() - today.getDay());

  while (i < 7) {
    const date = new Date(weekStart);
    week[DaysOfWeek[i++]] = {
      date,
      simpleDate: getSimplifiedDate(date),
      year: date.getFullYear()
    };
    weekStart.setDate(weekStart.getDate() + 1);
  }

  return week;
};

export const getRelatedWeek = (
  week: WeekType,
  previous: boolean = true
): WeekType => {
  const newWeek: WeekType = {};

  Object.keys(week).forEach((day) => {
    const date = new Date(week[day as keyof WeekType].date);
    date.setDate(previous ? date.getDate() - 7 : date.getDate() + 7);

    newWeek[day as keyof WeekType] = {
      date,
      simpleDate: getSimplifiedDate(date),
      year: date.getFullYear()
    };
  });

  return newWeek;
};
