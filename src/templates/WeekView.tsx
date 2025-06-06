import { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import DayView from "../molecules/DayView";
import { DaysOfWeek } from "../constants/app.constants";
import { getWeek } from "../functions/date.function";
import type { WeekType } from "../constants/app.types";
import SelectWeek from "../molecules/SelectWeek";

const WeekView: React.FC = () => {
  const currentWeek = getWeek();

  const [week, setWeek] = useState<WeekType>(currentWeek);
  const [selectedDay, setSelectedDay] = useState<string>(
    DaysOfWeek[new Date().getDay()]
  );

  return (
    <>
      <SelectWeek week={week} setWeek={setWeek} currentWeek={currentWeek} />

      <Box sx={{ flexGrow: 1, display: "flex", mt: 2 }}>
        <Tabs
          orientation="vertical"
          value={selectedDay}
          onChange={(_, d) => setSelectedDay(d)}
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

        <DayView day={selectedDay} weekDay={week[selectedDay]} />
      </Box>
    </>
  );
};

export default WeekView;
