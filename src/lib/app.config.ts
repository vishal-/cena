export const AppPath = {
  ADD_DISH: "/add-dish",
  DISH_BY_ID: "/dish",
  DISHES: "/dishes",
  AUTH: "/auth",
  WEEK: "/week"
} as const;

export type AppPath = (typeof AppPath)[keyof typeof AppPath];
