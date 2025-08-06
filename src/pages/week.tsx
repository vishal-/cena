import { useState } from "react";
import SideNav from "../components/common/sideNav";

const Week = () => {
  const [selectedDay, setSelectedDay] = useState<string>("Monday");

  return (
    <div className="flex h-screen">
      {/* Side Navigation */}

      <SideNav selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

      {/* Main Content */}
      <main className="flex-1">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
          <h2 className="text-white text-2xl font-bold mb-4">{selectedDay}</h2>
          <p className="text-gray-300 mb-2">
            This is the card for {selectedDay}.
          </p>
          <p className="text-gray-400">
            Add your content for {selectedDay} here.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Week;
