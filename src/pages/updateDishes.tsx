import React, { useState, useEffect } from "react";
import supabase from "../utils/supabase";
import DishForm from "../components/common/dishForm";
import type { Dish } from "../types/dish";

const UpdateDishes: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [editing, setEditing] = useState<Dish | null>(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchDishes = async () => {
      const { data, error } = await supabase
        .from("Dishes")
        .select("*")
        .order("id");

      if (error) {
        alert("Error fetching dishes: " + error.message);
      } else {
        setDishes(data || []);
      }
    };

    fetchDishes();
  }, []);

  const handleSave = async (dishData: Omit<Dish, 'id'> | Dish) => {
    if (!dishData.name.trim()) return;
    
    setLoading(true);
    
    if ('id' in dishData) {
      // Edit existing dish
      const { error } = await supabase
        .from("Dishes")
        .update(dishData)
        .eq("id", dishData.id);

      if (error) {
        alert("Error updating dish: " + error.message);
      } else {
        setDishes(
          dishes.map((dish) =>
            dish.id === dishData.id ? dishData as Dish : dish
          )
        );
        setEditing(null);
      }
    } else {
      // Add new dish
      const { data, error } = await supabase
        .from("Dishes")
        .insert([dishData])
        .select();

      if (error) {
        alert("Error adding dish: " + error.message);
      } else {
        setDishes([...dishes, ...data]);
      }
    }
    
    setLoading(false);
  };

  const handleEdit = (dish: Dish) => {
    setEditing(dish);
  };



  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">
        Manage Dishes
      </h2>

      {/* Add New Dish Form */}
      {!editing && <DishForm onSave={handleSave} loading={loading} />}
      
      {/* Edit Dish Form */}
      {editing && (
        <DishForm 
          onSave={handleSave} 
          loading={loading} 
          initialData={editing} 
          isEditing={true} 
        />
      )}

      {/* Dishes List */}
      <div className="space-y-4">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6"
          >
            {editing?.id !== dish.id && (
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white">
                    {dish.name}
                  </h3>
                  <button
                    onClick={() => handleEdit(dish)}
                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                  >
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-300 mb-4">
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
                      <strong>Cook Time:</strong> {dish.cookng_time} min
                    </div>
                  )}
                  <div>
                    <strong>Prep Required:</strong>{" "}
                    {dish.prep_required ? "Yes" : "No"}
                  </div>
                </div>
                {dish.description && (
                  <p className="text-gray-300 mb-2">{dish.description}</p>
                )}
                {dish.recipe && (
                  <p className="text-gray-400 text-sm mb-2">
                    <strong>Recipe:</strong> {dish.recipe}
                  </p>
                )}
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
              </div>
            )}
          </div>
        ))}
      </div>

      {dishes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            No dishes added yet. Add your first dish above!
          </p>
        </div>
      )}
    </div>
  );
};

export default UpdateDishes;
