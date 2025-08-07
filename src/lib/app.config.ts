export const AppPath = {
  AUTH: "/auth",
  WEEK: "/week"
} as const;

export type AppPath = (typeof AppPath)[keyof typeof AppPath];
