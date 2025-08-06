import { getDateForDay } from "../../utils/date.utils";
import MealMenu from "./MealMenu";

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
  const mealTypes = [
    {
      type: "breakfast" as const,
      title: "Breakfast",
      color: "blue",
    },
    { type: "lunch" as const, title: "Lunch", color: "green" },
    { type: "dinner" as const, title: "Dinner", color: "purple" },
  ];

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
      <h3 className="text-white text-2xl font-bold">{selectedDay}</h3>
      <p className="text-gray-400 text-sm mb-6">
        {getDateForDay(selectedDay, currentWeekStart)}
      </p>

      {mealTypes.map(({ type, title, color }) => (
        <MealMenu
          key={type}
          title={title}
          mealType={type}
          meals={meals[selectedDay]?.[type] || []}
          onAddMeal={(meal) => addMeal(type, meal)}
          color={color}
        />
      ))}
    </div>
  );
};

export default DayCard;
