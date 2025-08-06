import { useState } from "react";
import SideNav from "../components/common/sideNav";
import Footer from "../components/common/footer";

const Week = () => {
  const [selectedDay, setSelectedDay] = useState<string>("Monday");

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Main Content Area */}
      <div className="flex h-[70%]">
        {/* Side Navigation */}
        <SideNav selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

        {/* Main Content */}
        <main className="flex-1 p-5">
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
      
      {/* Footer takes 30% height */}
      <div className="h-[30%]">
        <Footer />
      </div>
    </div>
  );
};

export default Week;
