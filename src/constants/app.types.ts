export interface WeekDayType {
  date: Date;
  simpleDate: string;
  year: number;
}

export type WeekType = {
  [day: string]: WeekDayType;
};
