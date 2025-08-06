import { useState } from "react";
import SideNav from "../components/common/sideNav";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import { getDateForDay } from "../utils/date.utils";

const Week = () => {
  const getWeekStart = (date: Date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day;
    return new Date(start.setDate(diff));
  };

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const [selectedDay, setSelectedDay] = useState<string>(today);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    getWeekStart(new Date())
  );

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
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
            <h3 className="text-white text-2xl font-bold">{selectedDay}</h3>
            <p className="text-gray-400 text-sm mb-6">
              {getDateForDay(selectedDay, currentWeekStart)}
            </p>
            <p className="text-gray-300 mb-2">
              This is the card for {selectedDay}.
            </p>
            <p className="text-gray-400">
              Add your content for {selectedDay} here.
            </p>
          </div>
        </main>
      </div>

      {/* Footer takes 30% height */}
      <div className="h-[30%]">
        <Footer />
      </div>
    </div>
  );
};

export default Week;
