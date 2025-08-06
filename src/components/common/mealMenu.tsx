import Badge, { type BadgeProps } from "../ui/badge";
import MealInput from "../ui/mealInput";

interface MealMenuProps {
  title: string;
  mealType: "breakfast" | "lunch" | "dinner";
  meals: string[];
  onAddMeal: (meal: string) => void;
  color: string;
}

const MealMenu = ({
  title,
  mealType,
  meals,
  onAddMeal,
  color,
}: MealMenuProps) => {
  return (
    <div className="mb-6">
      <h4 className="text-white text-lg font-semibold mb-2">{title}</h4>
      <MealInput onSelect={onAddMeal} placeholder={`Add ${mealType} item...`} />
      <div className="mt-2 flex flex-wrap gap-2">
        {meals?.map((meal, index) => (
          <Badge
            key={index}
            text={meal}
            color={color as BadgeProps["color"]}
            onDelete={() => undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default MealMenu;
