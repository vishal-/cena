import React, { useState, useEffect } from "react";
import supabase from "../utils/supabase";
import DishForm from "../components/common/dishForm";
import type { Dish } from "../types/dish";
import DishCard from "../components/common/dishCard";
import NavHeader from "../components/common/navHeader";

const UpdateDishes: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [editing, setEditing] = useState<Dish | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>([]);

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
        setFilteredDishes(data || []);
      }
    };

    fetchDishes();
  }, []);

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filtered = dishes.filter(dish => 
        dish.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDishes(filtered);
    } else {
      setFilteredDishes(dishes);
    }
  };

  const handleSave = async (dishData: Omit<Dish, "id"> | Dish) => {
    if (!dishData.name.trim()) return;

    setLoading(true);

    if ("id" in dishData) {
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
            dish.id === dishData.id ? (dishData as Dish) : dish
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

  //   const handleEdit = (dish: Dish) => {
  //     setEditing(dish);
  //   };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 min-h-screen">
      <NavHeader label="Dishes" />

      {/* Search Bar */}
      <div className="mb-6 flex gap-2">
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
          className={`px-6 py-3 rounded-md font-medium ${
            searchTerm.length >= 3
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          Search
        </button>
      </div>

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
        {filteredDishes.map((dish) => (
          <div
            key={dish.id}
            className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6"
          >
            {editing?.id !== dish.id && <DishCard dish={dish} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateDishes;
