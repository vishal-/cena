import { useMemo, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import DayView from "../molecules/DayView";
import { DaysOfWeek } from "../constants/app.constants";
import { getWeek } from "../functions/date.function";

const WeekView = () => {
  const [selectedDay, setSelectedDay] = useState<string>(
    DaysOfWeek[new Date().getDay()]
  );
  const week = useMemo(() => getWeek(), []);

  return (
    <>
      <Box sx={{ flexGrow: 1, display: "flex", mt: 2 }}>
        <Tabs
          orientation="vertical"
          value={selectedDay}
          onChange={(_, d) => setSelectedDay(d)}
          aria-label="Vertical Tabs Example"
          sx={{
            borderRight: 1,
            borderColor: "divider",
            alignSelf: "baseline"
          }}
        >
          {DaysOfWeek.map((day) => (
            <Tab
              key={`weekview_${day}`}
              label={day}
              value={day}
              sx={{ my: 1 }}
            />
          ))}
        </Tabs>

        <DayView day={selectedDay} date={week[selectedDay]} />
      </Box>
    </>
  );
};

export default WeekView;
