import React, { useState } from "react";
import type { Dish } from "../types/dish";
import DishCard from "../components/common/dishCard";
import DishForm from "../components/common/dishForm";
import NavHeader from "../components/common/navHeader";
import Notify from "../components/ui/notify";
import { tablesDB } from "../utils/appwrite";
import { DATABASE_CONFIG } from "../config/database";
import {
  formatErrorMessage,
  getErrorMessageWithFallback
} from "../utils/error.utils";

const AddDish: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [validatedDish, setValidatedDish] = useState<Omit<Dish, "id"> | null>(
    null
  );
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"form" | "json">("form");
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const validateJson = () => {
    try {
      const dishData = JSON.parse(jsonInput);

      // Basic validation for required fields
      if (!dishData.name || typeof dishData.name !== "string") {
        throw new Error("Name is required and must be a string");
      }

      setValidatedDish(dishData);
      setError("");
    } catch (err) {
      setError(getErrorMessageWithFallback(err, "Invalid JSON format"));
      setValidatedDish(null);
    }
  };

  const handleSave = async () => {
    if (!validatedDish) return;

    setLoading(true);
    try {
      await tablesDB.createRow({
        databaseId: DATABASE_CONFIG.databaseId,
        tableId: DATABASE_CONFIG.collections.dishes,
        rowId: "unique()",
        data: validatedDish
      });

      setNotification({ message: "Dish saved successfully!", type: "success" });
      setJsonInput("");
      setValidatedDish(null);
      setError("");
    } catch (error) {
      setNotification({
        message: formatErrorMessage("Error saving dish", error),
        type: "error"
      });
    }
    setLoading(false);
  };

  const handleFormSave = async (dishData: Omit<Dish, "$id">) => {
    if (!dishData.name.trim()) return;

    setLoading(true);
    try {
      await tablesDB.createRow({
        databaseId: DATABASE_CONFIG.databaseId,
        tableId: DATABASE_CONFIG.collections.dishes,
        rowId: "unique()",
        data: dishData
      });

      setNotification({ message: "Dish saved successfully!", type: "success" });
      setError("");
    } catch (error) {
      setNotification({
        message: formatErrorMessage("Error saving dish", error),
        type: "error"
      });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 min-h-screen">
      <NavHeader label="Add Dish" />

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("form")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "form"
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
              }`}
            >
              Form Input
            </button>
            <button
              onClick={() => setActiveTab("json")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "json"
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
              }`}
            >
              JSON Input
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "form" && (
        <div>
          <DishForm onSave={handleFormSave} loading={loading} />
        </div>
      )}

      {activeTab === "json" && (
        <div className="mb-6">
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder={`{
  "name": "Chicken Tikka Masala",
  "description": "Creamy and flavorful Indian curry with tender chicken pieces",
  "recipe": "1. Marinate chicken in yogurt and spices for 2 hours\\n2. Grill or bake chicken until cooked\\n3. Cook onions, garlic, and ginger\\n4. Add tomatoes and spices\\n5. Stir in cream and simmer\\n6. Add grilled chicken and cook for 10 minutes",
  "ytLink": "https://www.youtube.com/watch?v=example",
  "cuisine": "Indian",
  "caloriePerServing": 450,
  "prepRequired": true,
  "cookingTime": 45
}`}
            className="w-full h-64 p-4 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono"
          />

          <div className="flex gap-4 mt-4">
            <button
              onClick={validateJson}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Validate JSON
            </button>

            {validatedDish && (
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Dish"}
              </button>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-900 border border-red-700 rounded-lg">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {notification && (
        <Notify
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {validatedDish && activeTab === "json" && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Preview:</h3>
          <DishCard
            dish={{ ...validatedDish, $id: "", $createdAt: "", $updatedAt: "" }}
          />
        </div>
      )}
    </div>
  );
};

export default AddDish;
