export const AppPath = {
  DISH_BY_ID: "/dish",
  DISHES: "/dishes",
  MEAL_TYPES: "/meal-types",
  AUTH: "/auth",
  WEEK: "/week"
} as const;

export type AppPath = (typeof AppPath)[keyof typeof AppPath];
