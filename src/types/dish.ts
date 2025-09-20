export interface Dish {
  id: string;
  name: string;
  description?: string;
  recipe?: string;
  ytLink?: string;
  cuisine: string;
  caloriePerServing?: number;
  prepRequired?: boolean;
  cookingTime?: number;
  updatedAt: string;
  owner: string;
}
