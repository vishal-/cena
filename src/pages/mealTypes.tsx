// Component to manage meal types (add/edit functionality)
import React, { useState } from "react";

interface MealType {
  id: number;
  name: string;
}

const MealTypes: React.FC = () => {
  const [mealTypes, setMealTypes] = useState<MealType[]>([]);
  const [newMealType, setNewMealType] = useState<string>("");
  const [editing, setEditing] = useState<MealType | null>(null);

  // Add new meal type
  const handleAdd = () => {
    if (newMealType.trim()) {
      const newType: MealType = {
        id: Date.now(),
        name: newMealType.trim()
      };
      setMealTypes([...mealTypes, newType]);
      setNewMealType("");
    }
  };

  // Start editing a meal type
  const handleEdit = (mealType: MealType) => {
    setEditing(mealType);
  };

  // Save edited meal type
  const handleSave = () => {
    if (editing) {
      setMealTypes(
        mealTypes.map((mealType) =>
          mealType.id === editing.id ? editing : mealType
        )
      );
      setEditing(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Meal Types
      </h2>

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
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {mealTypes.map((mealType) => (
          <div
            key={mealType.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
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
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span className="text-gray-800 font-medium">
                  {mealType.name}
                </span>
                <button
                  onClick={() => handleEdit(mealType)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
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
