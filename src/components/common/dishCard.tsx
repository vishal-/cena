import type { Dish } from "../../types/dish";
import { formatDateWithYear } from "../../utils/date.utils";

const DishCard: React.FC<{ dish: Dish }> = ({ dish }) => {
  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-xl font-semibold text-white">{dish.name}</h3>

        {dish.yt_link && (
          <a
            href={dish.yt_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline text-sm"
          >
            View Recipe Video
          </a>
        )}
        {/* <button
                    onClick={() => handleEdit(dish)}
                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                  >
                    Edit
                  </button> */}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-300 mb-6">
        {dish.cuisine && (
          <div>
            <strong>Cuisine:</strong> {dish.cuisine}
          </div>
        )}
        {dish.calorie_per_serving && (
          <div>
            <strong>Calories:</strong> {dish.calorie_per_serving}
          </div>
        )}
        {dish.cookng_time && (
          <div>
            <strong>Cooking Time:</strong> {dish.cookng_time} min
          </div>
        )}
        <div>
          <strong>Prep Required:</strong>&#160;
          {dish.prep_required ? "Yes" : "No"}
        </div>
      </div>
      {dish.description && (
        <p className="text-gray-300 mb-6">{dish.description}</p>
      )}
      {dish.recipe && (
        <p className="text-gray-400 text-sm">
          <strong>Recipe:</strong> {dish.recipe}
        </p>
      )}

      <div className="mt-4 pt-4 border-t border-gray-700 grid md:grid-cols-2">
        <p className="text-sm text-gray-400">
          Updated by:&#160;
          <span className="text-gray-300">{dish.updated_by}</span>
        </p>
        {dish.updated_at && (
          <p className="text-sm text-gray-400">
            Updated at:&#160;
            <span className="text-gray-300">
              {formatDateWithYear(new Date(dish.updated_at))}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default DishCard;
