export const DATABASE_CONFIG = {
  databaseId: "databaseId",
  collections: {
    dishes: "dishesCollectionId"
  }
} as const;

export const MEAL_TYPES = [
  "Breakfast",
  "Lunch", 
  "Dinner",
  "Snack",
  "Dessert",
  "Appetizer"
] as const;