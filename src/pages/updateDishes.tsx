import React, { useState, useEffect } from "react";
import supabase from "../utils/supabase";

interface Dish {
  id: number;
  name: string;
  description?: string;
  recipe?: string;
  yt_link?: string;
  cuisine?: string;
  calorie_per_serving?: number;
  prep_required?: boolean;
  cookng_time?: number;
}

const UpdateDishes: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [editing, setEditing] = useState<Dish | null>(null);
  const [loading, setLoading] = useState(false);
  const [newDish, setNewDish] = useState<Omit<Dish, 'id'>>({
    name: "",
    description: "",
    recipe: "",
    yt_link: "",
    cuisine: "",
    calorie_per_serving: undefined,
    prep_required: false,
    cookng_time: undefined,
  });

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

  const handleAdd = async () => {
    if (newDish.name.trim()) {
      setLoading(true);
      const { data, error } = await supabase
        .from("Dishes")
        .insert([newDish])
        .select();

      if (error) {
        alert("Error adding dish: " + error.message);
      } else {
        setDishes([...dishes, ...data]);
        setNewDish({
          name: "",
          description: "",
          recipe: "",
          yt_link: "",
          cuisine: "",
          calorie_per_serving: undefined,
          prep_required: false,
          cookng_time: undefined,
        });
      }
      setLoading(false);
    }
  };

  const handleEdit = (dish: Dish) => {
    setEditing(dish);
  };

  const handleSave = async () => {
    if (editing) {
      setLoading(true);
      const { error } = await supabase
        .from("Dishes")
        .update(editing)
        .eq("id", editing.id);

      if (error) {
        alert("Error updating dish: " + error.message);
      } else {
        setDishes(
          dishes.map((dish) =>
            dish.id === editing.id ? editing : dish
          )
        );
        setEditing(null);
      }
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">Manage Dishes</h2>

      {/* Add New Dish Form */}
      <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Add New Dish</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Dish Name *"
            value={newDish.name}
            onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Cuisine"
            value={newDish.cuisine || ""}
            onChange={(e) => setNewDish({ ...newDish, cuisine: e.target.value })}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="number"
            placeholder="Calories per serving"
            value={newDish.calorie_per_serving || ""}
            onChange={(e) => setNewDish({ ...newDish, calorie_per_serving: e.target.value ? Number(e.target.value) : undefined })}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="number"
            placeholder="Cooking time (minutes)"
            value={newDish.cookng_time || ""}
            onChange={(e) => setNewDish({ ...newDish, cookng_time: e.target.value ? Number(e.target.value) : undefined })}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="url"
            placeholder="YouTube Link"
            value={newDish.yt_link || ""}
            onChange={(e) => setNewDish({ ...newDish, yt_link: e.target.value })}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              id="prep_required"
              checked={newDish.prep_required || false}
              onChange={(e) => setNewDish({ ...newDish, prep_required: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="prep_required" className="text-white">Prep Required</label>
          </div>
        </div>
        <div className="mt-4">
          <textarea
            placeholder="Description"
            value={newDish.description || ""}
            onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>
        <div className="mt-4">
          <textarea
            placeholder="Recipe"
            value={newDish.recipe || ""}
            onChange={(e) => setNewDish({ ...newDish, recipe: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
          />
        </div>
        <button
          onClick={handleAdd}
          disabled={loading}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Dish"}
        </button>
      </div>

      {/* Dishes List */}
      <div className="space-y-4">
        {dishes.map((dish) => (
          <div key={dish.id} className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
            {editing?.id === dish.id ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    value={editing.name}
                    onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    value={editing.cuisine || ""}
                    onChange={(e) => setEditing({ ...editing, cuisine: e.target.value })}
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    value={editing.calorie_per_serving || ""}
                    onChange={(e) => setEditing({ ...editing, calorie_per_serving: e.target.value ? Number(e.target.value) : undefined })}
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    value={editing.cookng_time || ""}
                    onChange={(e) => setEditing({ ...editing, cookng_time: e.target.value ? Number(e.target.value) : undefined })}
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="url"
                    value={editing.yt_link || ""}
                    onChange={(e) => setEditing({ ...editing, yt_link: e.target.value })}
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editing.prep_required || false}
                      onChange={(e) => setEditing({ ...editing, prep_required: e.target.checked })}
                      className="mr-2"
                    />
                    <label className="text-white">Prep Required</label>
                  </div>
                </div>
                <textarea
                  value={editing.description || ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4"
                  rows={3}
                />
                <textarea
                  value={editing.recipe || ""}
                  onChange={(e) => setEditing({ ...editing, recipe: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4"
                  rows={4}
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
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white">{dish.name}</h3>
                  <button
                    onClick={() => handleEdit(dish)}
                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                  >
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-300 mb-4">
                  {dish.cuisine && <div><strong>Cuisine:</strong> {dish.cuisine}</div>}
                  {dish.calorie_per_serving && <div><strong>Calories:</strong> {dish.calorie_per_serving}</div>}
                  {dish.cookng_time && <div><strong>Cook Time:</strong> {dish.cookng_time} min</div>}
                  <div><strong>Prep Required:</strong> {dish.prep_required ? "Yes" : "No"}</div>
                </div>
                {dish.description && <p className="text-gray-300 mb-2">{dish.description}</p>}
                {dish.recipe && <p className="text-gray-400 text-sm mb-2"><strong>Recipe:</strong> {dish.recipe}</p>}
                {dish.yt_link && (
                  <a href={dish.yt_link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm">
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
          <p className="text-gray-400 text-lg">No dishes added yet. Add your first dish above!</p>
        </div>
      )}
    </div>
  );
};

export default UpdateDishes;