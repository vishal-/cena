import { DaysOfWeek } from "../constants/app.constants";

export const getWeek = (today: Date = new Date()): Record<string, Date> => {
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
