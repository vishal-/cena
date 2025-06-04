import { DaysOfWeek } from "../constants/app.constants";
import type { WeekType } from "../constants/app.types";

export const getWeek = (today: Date = new Date()): WeekType => {
  const week: Record<string, Date> = {};
  const weekStart = new Date(today);
  let i = 0;

  weekStart.setDate(weekStart.getDate() - today.getDay());

  while (i < 7) {
    week[DaysOfWeek[i++]] = new Date(weekStart);
    weekStart.setDate(weekStart.getDate() + 1);
  }

  return week;
};

export const getSimplifiedDate = (date: Date): string => {
  const d = date.toDateString().split(" ");

  return `${d[1]} ${d[2]} ${d[3]}`;
};

export const overSimplifiedDate = (date: Date): string => {
  const d = date.toDateString().split(" ");

  return `${d[2]} ${d[1]}`;
};

export const getRelatedWeek = (
  week: WeekType,
  previous: boolean = true
): WeekType => {
  const newWeek: WeekType = {};

  Object.keys(week).forEach((day) => {
    const date = new Date(week[day as keyof WeekType]);
    date.setDate(previous ? date.getDate() - 7 : date.getDate() + 7);
    newWeek[day as keyof WeekType] = date;
  });

  return newWeek;
};
