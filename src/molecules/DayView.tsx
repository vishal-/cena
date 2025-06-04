import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import PlanBox from "./PlanBox";
import type React from "react";
import { Meals } from "../constants/app.constants";
import { getSimplifiedDate } from "../functions/date.function";

interface DayViewProps {
  day: string;
  date: Date;
}

const DayView: React.FC<DayViewProps> = ({ day, date }) => {
  const simplifiedDate = getSimplifiedDate(date);

  const isPastDate =
    date.toDateString() === new Date().toDateString()
      ? false
      : date < new Date();

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        title={<Typography variant="h5">{day}</Typography>}
        subheader={
          <Typography variant="subtitle2">{simplifiedDate}</Typography>
        }
      />
      <CardContent>
        {isPastDate && (
          <Typography variant="body1" color="error">
            Date is passed (not editable)
          </Typography>
        )}

        {Meals.map((meal) => (
          <PlanBox key={`meal_${meal}`} meal={meal} disable={isPastDate} />
        ))}
      </CardContent>
    </Card>
  );
};

export default DayView;
