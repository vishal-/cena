import { useState } from "react";
import SideNav from "../components/common/sideNav";
import Footer from "../components/common/footer";

const Week = () => {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const [selectedDay, setSelectedDay] = useState<string>(today);

  const getDateForDay = (dayName: string) => {
    const today = new Date();
    const currentDay = today.getDay();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const targetDay = days.indexOf(dayName);
    const diff = targetDay - currentDay;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + diff);
    return targetDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Main Content Area */}
      <div className="flex h-[70%]">
        {/* Side Navigation */}
        <SideNav selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

        {/* Main Content */}
        <main className="flex-1 p-3">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
            <h3 className="text-white text-2xl font-bold">{selectedDay}</h3>
            <p className="text-gray-400 text-sm mb-6">
              {getDateForDay(selectedDay)}
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
