import { useState, useEffect } from "react";
import type { Dish } from "../../types/dish";
import { cuisines } from "../../lib/cuisines";

interface DishFormProps {
  onSave: (dish: Omit<Dish, "$id"> | Dish) => void | Promise<void>;
  loading?: boolean;
  initialData?: Dish;
  isEditing?: boolean;
}

const DishForm: React.FC<DishFormProps> = ({
  onSave,
  loading,
  initialData,
  isEditing
}) => {
  const [dish, setDish] = useState<Omit<Dish, "$id"> | Dish>(
    initialData || {
      name: "",
      description: "",
      recipe: "",
      yt_link: "",
      cuisine: "",
      calorie_per_serving: undefined,
      prep_required: false,
      cooking_time: undefined,
      owner: "",
      $createdAt: "",
      $updatedAt: ""
    }
  );

  useEffect(() => {
    if (initialData) {
      setDish(initialData);
    }
  }, [initialData]);

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4 text-white">
        {isEditing ? "Edit Dish" : "Add New Dish"}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Dish Name * (lowercase, numbers, hyphens only)"
          value={dish.name}
          onChange={(e) => {
            const value = e.target.value
              .toLowerCase()
              .replace(/[^a-z0-9-]/g, "");
            setDish({ ...dish, name: value });
          }}
          className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          value={dish.cuisine || ""}
          onChange={(e) => setDish({ ...dish, cuisine: e.target.value })}
          className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select Cuisine</option>
          {cuisines.map((cuisine) => (
            <option key={cuisine} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Calories per serving"
          value={dish.calorie_per_serving || ""}
          onChange={(e) =>
            setDish({
              ...dish,
              calorie_per_serving: e.target.value
                ? Number(e.target.value)
                : undefined
            })
          }
          className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="number"
          placeholder="Cooking time (minutes)"
          value={dish.cooking_time || ""}
          onChange={(e) =>
            setDish({
              ...dish,
              cooking_time: e.target.value ? Number(e.target.value) : undefined
            })
          }
          className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="url"
          placeholder="YouTube Link"
          value={dish.yt_link || ""}
          onChange={(e) => setDish({ ...dish, yt_link: e.target.value })}
          className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            id="prep_required"
            checked={dish.prep_required || false}
            onChange={(e) =>
              setDish({ ...dish, prep_required: e.target.checked })
            }
            className="mr-2"
          />
          <label htmlFor="prep_required" className="text-white">
            Prep Required
          </label>
        </div>
      </div>
      <div className="mt-4">
        <textarea
          placeholder="Description"
          value={dish.description || ""}
          onChange={(e) => setDish({ ...dish, description: e.target.value })}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
        />
      </div>
      <div className="mt-4">
        <label className="block text-white mb-2">Recipe</label>
        <textarea
          placeholder="Recipe instructions (formatting like line breaks and spacing will be preserved)"
          value={dish.recipe || ""}
          onChange={(e) => setDish({ ...dish, recipe: e.target.value })}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
          style={{ whiteSpace: "pre-wrap" }}
          rows={8}
        />
      </div>
      <button
        onClick={() => onSave(dish)}
        disabled={loading}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
      >
        {loading
          ? isEditing
            ? "Saving..."
            : "Adding..."
          : isEditing
          ? "Save"
          : "Add Dish"}
      </button>
    </div>
  );
};

export default DishForm;
