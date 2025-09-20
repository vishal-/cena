import React, { useState } from "react";
import { Link } from "react-router-dom";
import { tablesDB } from "../utils/appwrite";
import type { Dish } from "../types/dish";
import NavHeader from "../components/common/navHeader";
import { AppPath } from "../lib/app.config";
import { FaExternalLinkAlt, FaPlus } from "react-icons/fa";
import Notify from "../components/ui/notify";
import { DATABASE_CONFIG } from "../config/database";
import { formatErrorMessage } from "../utils/error.utils";
import { fromApiDish, ApiDish } from "../utils/dishTransform";

type DishSearchResult = {
  id: Dish["id"];
  name: Dish["name"];
};

const FindDishes: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDishes, setFilteredDishes] = useState<DishSearchResult[]>([]);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleSearch = async () => {
    if (searchTerm.length >= 3) {
      setLoading(true);
      try {
        const response = await tablesDB.listRows({
          databaseId: DATABASE_CONFIG.databaseId,
          tableId: DATABASE_CONFIG.collections.dishes
        });
        const filtered = response.rows
          .map((row) => fromApiDish(row as unknown as ApiDish))
          .filter((dish) =>
            dish.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        setFilteredDishes(
          filtered.map((dish) => ({ id: dish.id, name: dish.name }))
        );
      } catch (error) {
        setNotification({
          message: formatErrorMessage("Error searching dishes", error),
          type: "error"
        });
        setFilteredDishes([]);
      } finally {
        setLoading(false);
      }
    } else {
      setFilteredDishes([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 min-h-screen">
      <NavHeader label="Dishes" />

      {/* Add Dish Button */}
      <div className="mb-6">
        <Link
          to={AppPath.ADD_DISH}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium"
        >
          <FaPlus className="mr-2" size={16} />
          Add New Dish
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search dishes by name..."
          className="flex-1 p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          disabled={searchTerm.length < 3}
          className={`px-6 py-3 rounded-md font-medium whitespace-nowrap ${
            searchTerm.length >= 3
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          Search
        </button>
      </div>

      {/* Dishes List */}
      {loading && (
        <div className="text-center py-8">
          <div className="text-white">Searching...</div>
        </div>
      )}

      <div className="space-y-2">
        {filteredDishes.map((dish) => (
          <Link
            key={dish.id}
            to={`${AppPath.DISH_BY_ID}/${dish.id}`}
            className="block bg-gray-800 rounded-lg border border-gray-700 p-4 hover:bg-gray-700 transition-colors"
          >
            <div className="text-white font-medium">
              {dish.name} <FaExternalLinkAlt className="inline ms-2" />
            </div>
          </Link>
        ))}
      </div>

      {!loading && searchTerm.length >= 3 && filteredDishes.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400">
            No dishes found matching "{searchTerm}"
          </div>
        </div>
      )}

      {notification && (
        <Notify
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default FindDishes;
