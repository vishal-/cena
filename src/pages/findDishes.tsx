import React, { useState } from "react";
import { Link } from "react-router-dom";
import { tablesDB } from "../utils/appwrite";
import DishForm from "../components/common/dishForm";
import type { Dish } from "../types/dish";
import NavHeader from "../components/common/navHeader";
import { AppPath } from "../lib/app.config";
import { FaExternalLinkAlt } from "react-icons/fa";
import Notify from "../components/ui/notify";
import { DATABASE_CONFIG } from "../config/database";
import { formatErrorMessage } from "../utils/error.utils";

type DishSearchResult = {
  id: Dish["id"];
  name: Dish["name"];
};

const FindDishes: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
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
        const filtered = response.rows.filter((dish: any) =>
          dish.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredDishes(filtered as unknown as DishSearchResult[]);
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

  const handleSave = async (dishData: Omit<Dish, "id">) => {
    if (!dishData.name.trim()) return;

    setLoading(true);
    try {
      const response = await tablesDB.createRow({
        databaseId: DATABASE_CONFIG.databaseId,
        tableId: DATABASE_CONFIG.collections.dishes,
        rowId: "unique()",
        data: dishData
      });
      setDishes([...dishes, response as unknown as Dish]);
      setShowAddForm(false);
      setNotification({ message: "Dish added successfully!", type: "success" });
    } catch (error) {
      setNotification({
        message: formatErrorMessage("Error adding dish", error),
        type: "error"
      });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 min-h-screen">
      <NavHeader label="Dishes" />

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

      {/* Add New Dish CTA */}
      {!showAddForm && (
        <div className="mb-8">
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors font-medium"
          >
            + Add a new dish
          </button>
        </div>
      )}

      {/* Add New Dish Form */}
      {showAddForm && (
        <div>
          <DishForm onSave={handleSave} loading={loading} />
          <div className="flex justify-center my-4">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

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
