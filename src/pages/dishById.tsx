import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../utils/supabase";
import DishCard from "../components/common/dishCard";
import type { Dish } from "../types/dish";

const DishById: React.FC = () => {
  const [dish, setDish] = useState<Dish | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
        const { data, error } = await supabase
          .from("Dishes")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        setDish(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDish();
  }, [id]);

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
      <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
        <DishCard dish={dish} />
      </div>
    </div>
  );
};

export default DishById;
