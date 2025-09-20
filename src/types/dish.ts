export interface Dish {
  id: number;
  name: string;
  description?: string;
  recipe?: string;
  ytLink?: string; // Changed from yt_link
  cuisine?: string;
  caloriePerServing?: number; // Changed from calorie_per_serving
  prepRequired?: boolean; // Changed from prep_required
  cookingTime?: number; // Changed from cookng_time
  updatedAt?: string; // Changed from updated_at
  owner: string; // Changed from updated_by
}
