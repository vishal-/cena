import { DAYS_OF_WEEK as days } from "../lib/app.constants";

export const getWeekEnd = (startDate: Date) => {
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  return endDate;
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    // year: "numeric",
  });
};

export const getDateForDay = (dayName: string, currentWeekStart: Date) => {
  const targetDay = days.indexOf(dayName);
  const targetDate = new Date(currentWeekStart);
  targetDate.setDate(currentWeekStart.getDate() + targetDay);
  return targetDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
