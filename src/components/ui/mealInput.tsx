import { useState } from "react";

interface MealInputProps {
  onSelect: (meal: string) => void;
  placeholder?: string;
}

const MealInput = ({
  onSelect,
  placeholder = "Search meals...",
}: MealInputProps) => {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const meals = [
    "Chicken Breast",
    "Salmon",
    "Rice",
    "Broccoli",
    "Eggs",
    "Oatmeal",
    "Greek Yogurt",
    "Banana",
    "Apple",
    "Spinach",
    "Sweet Potato",
    "Quinoa",
    "Avocado",
    "Almonds",
    "Turkey",
    "Pasta",
    "Tuna",
    "Beans",
  ];

  const filteredMeals = meals.filter((meal) =>
    meal.toLowerCase().includes(input.toLowerCase())
  );

  const handleSelect = (meal: string) => {
    setInput("");
    setShowSuggestions(false);
    onSelect(meal);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setShowSuggestions(e.target.value.length > 0);
        }}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder={placeholder}
        className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
      />

      {showSuggestions && filteredMeals.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-md max-h-48 overflow-y-auto">
          {filteredMeals.map((meal) => (
            <div
              key={meal}
              onClick={() => handleSelect(meal)}
              className="p-3 text-white hover:bg-gray-600 cursor-pointer"
            >
              {meal}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MealInput;
