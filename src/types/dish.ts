export interface Dish {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  description?: string;
  recipe?: string;
  yt_link?: string;
  cuisine: string;
  calorie_per_serving?: number;
  prep_required?: boolean;
  cooking_time?: number;
  owner: string;
}
