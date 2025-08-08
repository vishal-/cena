import React, { useState } from "react";
import type { Dish } from "../types/dish";
import DishCard from "../components/common/dishCard";
import NavHeader from "../components/common/navHeader";
import Notify from "../components/ui/notify";
import supabase from "../utils/supabase";

const AddDish: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [validatedDish, setValidatedDish] = useState<Omit<Dish, "id"> | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const validateJson = () => {
    try {
      const dishData = JSON.parse(jsonInput);
      
      // Basic validation for required fields
      if (!dishData.name || typeof dishData.name !== 'string') {
        throw new Error('Name is required and must be a string');
      }
      
      setValidatedDish(dishData);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON format");
      setValidatedDish(null);
    }
  };

  const handleSave = async () => {
    if (!validatedDish) return;
    
    setLoading(true);
    const { error } = await supabase
      .from("Dishes")
      .insert([validatedDish]);

    if (error) {
      setNotification({ message: "Error saving dish: " + error.message, type: "error" });
    } else {
      setNotification({ message: "Dish saved successfully!", type: "success" });
      setJsonInput("");
      setValidatedDish(null);
      setError("");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 min-h-screen">
      <NavHeader label="Add Dish via JSON" />
      
      <div className="mb-6">
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Enter dish JSON here..."
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

      {validatedDish && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Preview:</h3>
          <DishCard dish={{ ...validatedDish, id: 0 }} />
        </div>
      )}
    </div>
  );
};

export default AddDish;
