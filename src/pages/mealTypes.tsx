// Component to manage meal types (add/edit functionality)
import React, { useState } from "react";

interface MealType {
  id: number;
  name: string;
}

const MealTypes: React.FC = () => {
  const [mealTypes, setMealTypes] = useState<MealType[]>([]);
  const [newMealType, setNewMealType] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState<string>("");

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
    setEditingId(mealType.id);
    setEditingName(mealType.name);
  };

  // Save edited meal type
  const handleSave = (id: number) => {
    setMealTypes(
      mealTypes.map((mealType) =>
        mealType.id === id ? { ...mealType, name: editingName } : mealType
      )
    );
    setEditingId(null);
    setEditingName("");
  };

  // Delete meal type
  const handleDelete = (id: number) => {
    setMealTypes(mealTypes.filter((mealType) => mealType.id !== id));
  };

  return (
    <div className="meal-types-container">
      <h2>Meal Types</h2>

      <div className="add-meal-type">
        <input
          type="text"
          value={newMealType}
          onChange={(e) => setNewMealType(e.target.value)}
          placeholder="Enter new meal type"
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul className="meal-types-list">
        {mealTypes.map((mealType) => (
          <li key={mealType.id}>
            {editingId === mealType.id ? (
              <>
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                />
                <button onClick={() => handleSave(mealType.id)}>Save</button>
              </>
            ) : (
              <>
                <span>{mealType.name}</span>
                <button onClick={() => handleEdit(mealType)}>Edit</button>
                <button onClick={() => handleDelete(mealType.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealTypes;
