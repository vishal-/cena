import { useMemo } from "react";
import { Box, Button, Typography } from "@mui/material";
import { getRelatedWeek } from "../functions/date.function";
import { DaysOfWeek } from "../constants/app.constants";
import type { WeekType } from "../constants/app.types";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { grey } from "@mui/material/colors";

interface SelectWeekProps {
  week: WeekType;
  setWeek: (week: WeekType) => void;
  currentWeek: WeekType;
}

const SelectWeek: React.FC<SelectWeekProps> = ({
  week,
  setWeek,
  currentWeek
}) => {
  const onPrev = () => setWeek(getRelatedWeek(week));
  const onNext = () => setWeek(getRelatedWeek(week, false));

  const isCurrentWeek = useMemo(
    () =>
      week[DaysOfWeek[0]].date.toDateString() ===
      currentWeek[DaysOfWeek[0]].date.toDateString(),
    [week]
  );

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ py: 2, backgroundColor: grey[900] }}
    >
      <Button variant="text" onClick={onPrev}>
        <ArrowLeftIcon />
        Prev
      </Button>

      <Typography
        align="center"
        variant="subtitle1"
        color={isCurrentWeek ? "" : "secondary"}
      >
        Week ( {week[DaysOfWeek[0]].simpleDate}&#160;-&#160;&#160;
        {week[DaysOfWeek[6]].simpleDate} )
      </Typography>

      <Button variant="text" onClick={onNext}>
        Next
        <ArrowRightIcon />
      </Button>
    </Box>
  );
};

export default SelectWeek;
