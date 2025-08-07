import { GiMeal } from "react-icons/gi";
import { DAYS_OF_WEEK as days } from "../../lib/app.constants";
import { useNavigate } from "react-router-dom";
import { AppPath } from "../../lib/app.config";

interface SideNavProps {
  selectedDay: string;
  setSelectedDay: (day: string) => void;
}

const SideNav: React.FC<SideNavProps> = ({ selectedDay, setSelectedDay }) => {
  const navigate = useNavigate();

  const gotoDishes = () => navigate(AppPath.DISHES);

  return (
    <nav className="w-18 bg-gray-800 border-r border-gray-700">
      <ul className="space-y-2 mt-9">
        {days.map((day) => (
          <li key={day}>
            <button
              onClick={() => setSelectedDay(day)}
              className={`w-full my-1 py-1 transition-colors ${
                selectedDay === day
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {day.substring(0, 3)}
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={gotoDishes}
        className="w-full mt-9 p-2 bg-green-800 text-white hover:bg-green-500 transition-colors flex items-center justify-center"
      >
        <GiMeal size={30} />
      </button>
    </nav>
  );
};

export default SideNav;
