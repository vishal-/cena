import { useState } from "react";
import SideNav from "../components/common/sideNav";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import DayCard from "../components/common/dayCard";
import { getWeekStart } from "../utils/date.utils";

const Week = () => {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const [selectedDay, setSelectedDay] = useState<string>(today);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    getWeekStart(new Date())
  );
  const [meals, setMeals] = useState<{
    [key: string]: { breakfast: string[]; lunch: string[]; dinner: string[] };
  }>({});

  const addMeal = (
    mealType: "breakfast" | "lunch" | "dinner",
    meal: string
  ) => {
    setMeals((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [mealType]: [...(prev[selectedDay]?.[mealType] || []), meal],
      },
    }));
  };

  const handlePrevWeek = () => {
    const prevWeek = new Date(currentWeekStart);
    prevWeek.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(prevWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(currentWeekStart);
    nextWeek.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(nextWeek);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Header
        currentWeekStart={currentWeekStart}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
      />
      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Side Navigation */}
        <SideNav selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

        {/* Main Content */}
        <main className="flex-1 p-3">
          <DayCard
            currentWeekStart={currentWeekStart}
            selectedDay={selectedDay}
            meals={meals}
            addMeal={addMeal}
          />
        </main>
      </div>

      {/* Footer takes 30% height */}
      {/* <div className="h-[30%]">
        <Footer />
      </div> */}
    </div>
  );
};

export default Week;
