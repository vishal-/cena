export const AppPath = {
  MEAL_TYPES: "/meal-types",
  AUTH: "/auth",
  WEEK: "/week"
} as const;

export type AppPath = (typeof AppPath)[keyof typeof AppPath];
