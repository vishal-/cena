export const AppPath = {
  WEEK: "/week"
} as const;

export type AppPath = (typeof AppPath)[keyof typeof AppPath];
