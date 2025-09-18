// Component to manage meal types (add/edit functionality)
import React, { useState, useEffect } from "react";
import { tablesDB } from "../utils/appwrite";

interface MealType {
  id: string;
  name: string;
}

const MealTypes: React.FC = () => {
  const [mealTypes, setMealTypes] = useState<MealType[]>([]);
  const [newMealType, setNewMealType] = useState<string>("");
  const [editing, setEditing] = useState<MealType | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch meal types from Appwrite
  useEffect(() => {
    const fetchMealTypes = async () => {
      try {
        const response = await tablesDB.list("mealTypesCollectionId");
        setMealTypes(response.documents);
      } catch (error) {
        alert("Error fetching meal types: " + error.message);
      }
    };

    fetchMealTypes();
  }, []);

  // Add new meal type
  const handleAdd = async () => {
    if (newMealType.trim()) {
      setLoading(true);
      try {
        const response = await tablesDB.create("mealTypesCollectionId", {
          name: newMealType.trim()
        });
        setMealTypes((prev) => [...prev, response]);
      } catch (error) {
        alert("Error adding meal type: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Start editing a meal type
  const handleEdit = (mealType: MealType) => {
    setEditing(mealType);
  };

  // Save edited meal type
  const handleSave = async () => {
    if (editing) {
      setLoading(true);
      try {
        await tablesDB.update("mealTypesCollectionId", editing.id, {
          name: editing.name
        });
        setMealTypes(
          mealTypes.map((mealType) =>
            mealType.id === editing.id ? editing : mealType
          )
        );
        setEditing(null);
      } catch (error) {
        alert("Error updating meal type: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Meal Types</h2>

      <div className="rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={newMealType}
            onChange={(e) => setNewMealType(e.target.value)}
            placeholder="Enter new meal type"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleAdd}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {mealTypes.map((mealType) => (
          <div
            key={mealType.id}
            className="rounded-lg shadow-sm border border-gray-700 p-2"
          >
            {editing?.id === mealType.id ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={editing.name}
                  onChange={(e) =>
                    setEditing({ ...editing, name: e.target.value })
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span className="font-medium">{mealType.name}</span>
                <button
                  onClick={() => handleEdit(mealType)}
                  className="px-2 py-1 bg-gray-700 text-gray-100 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {mealTypes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No meal types added yet. Add your first meal type above!
          </p>
        </div>
      )}
    </div>
  );
};

export default MealTypes;
