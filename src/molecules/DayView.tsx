import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import PlanBox from "./PlanBox";
import type React from "react";
import { Meals } from "../constants/app.constants";
import type { WeekDayType } from "../constants/app.types";

interface DayViewProps {
  weekDay: WeekDayType;
  day: string;
}

const DayView: React.FC<DayViewProps> = ({ weekDay, day }) => {
  const { date, simpleDate, year } = weekDay;

  const isPastDate =
    date.toDateString() === new Date().toDateString()
      ? false
      : date < new Date();

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        title={<Typography variant="h5">{day}</Typography>}
        subheader={
          <>
            <Typography variant="subtitle2">
              {simpleDate}&#160;{year}
              {isPastDate && (
                <Typography component="span" sx={{ mx: 1 }} color="error">
                  (not editable)
                </Typography>
              )}
            </Typography>
          </>
        }
      />

      <CardContent>
        {Meals.map((meal) => (
          <PlanBox key={`meal_${meal}`} meal={meal} disable={isPastDate} />
        ))}
      </CardContent>
    </Card>
  );
};

export default DayView;
