import { getDateForDay } from "../../utils/date.utils";
import MealInput from "../ui/mealInput";

interface DayCardProps {
  selectedDay: string;
  currentWeekStart: Date;
  meals: {
    [key: string]: { breakfast: string[]; lunch: string[]; dinner: string[] };
  };
  addMeal: (mealType: "breakfast" | "lunch" | "dinner", meal: string) => void;
}

const DayCard: React.FC<DayCardProps> = ({
  selectedDay,
  currentWeekStart,
  meals,
  addMeal,
}) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
      <h3 className="text-white text-2xl font-bold">{selectedDay}</h3>
      <p className="text-gray-400 text-sm mb-6">
        {getDateForDay(selectedDay, currentWeekStart)}
      </p>

      {/* Breakfast */}
      <div className="mb-6">
        <h4 className="text-white text-lg font-semibold mb-2">Breakfast</h4>
        <MealInput
          onSelect={(meal) => addMeal("breakfast", meal)}
          placeholder="Add breakfast item..."
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {meals[selectedDay]?.breakfast?.map((meal, index) => (
            <span
              key={index}
              className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
            >
              {meal}
            </span>
          ))}
        </div>
      </div>

      {/* Lunch */}
      <div className="mb-6">
        <h4 className="text-white text-lg font-semibold mb-2">Lunch</h4>
        <MealInput
          onSelect={(meal) => addMeal("lunch", meal)}
          placeholder="Add lunch item..."
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {meals[selectedDay]?.lunch?.map((meal, index) => (
            <span
              key={index}
              className="bg-green-600 text-white px-3 py-1 rounded-full text-sm"
            >
              {meal}
            </span>
          ))}
        </div>
      </div>

      {/* Dinner */}
      <div className="mb-4">
        <h4 className="text-white text-lg font-semibold mb-2">Dinner</h4>
        <MealInput
          onSelect={(meal) => addMeal("dinner", meal)}
          placeholder="Add dinner item..."
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {meals[selectedDay]?.dinner?.map((meal, index) => (
            <span
              key={index}
              className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm"
            >
              {meal}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayCard;
