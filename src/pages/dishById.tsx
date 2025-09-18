import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tablesDB } from "../utils/appwrite";
import DishCard from "../components/common/dishCard";
import DishForm from "../components/common/dishForm";
import type { Dish } from "../types/dish";
import NavHeader from "../components/common/navHeader";

const DishById: React.FC = () => {
  const [dish, setDish] = useState<Dish | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchDish = async () => {
      if (!id) {
        setError("No dish ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await tablesDB.getRow({
          databaseId: "databaseId",
          tableId: "dishesCollectionId",
          rowId: id
        });
        setDish(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDish();
  }, [id]);

  const handleSave = async (dishData: Omit<Dish, "id"> | Dish) => {
    if (!dish) return;

    setSaveLoading(true);
    try {
      await tablesDB.updateRow({
        databaseId: "databaseId",
        tableId: "dishesCollectionId",
        rowId: dish.id,
        data: dishData
      });
      setDish({ ...dishData, id: dish.id } as Dish);
      setIsEditing(false);
    } catch (error) {
      alert("Error updating dish: " + error.message);
    }
    setSaveLoading(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-900 min-h-screen">
        <div className="text-center text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-900 min-h-screen">
        <div className="text-center text-red-400">Error: {error}</div>
      </div>
    );
  }

  if (!dish) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-900 min-h-screen">
        <div className="text-center text-gray-400">No dish found</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 min-h-screen">
      <NavHeader label={dish.name} />

      {isEditing ? (
        <div>
          <DishForm
            onSave={handleSave}
            loading={saveLoading}
            initialData={dish}
            isEditing={true}
          />
          <div className="flex gap-4 justify-center mt-4">
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
            <DishCard dish={dish} />
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DishById;
