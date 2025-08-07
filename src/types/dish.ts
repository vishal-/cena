export interface Dish {
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
