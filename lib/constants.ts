export const CATEGORIES: Record<string, string> = {
  relapse_stories: "Relapse stories",
  enablers_corner: "Enablers corner",
  intervention: "Intervention requests",
  success_stories: "Success stories",
  meta: "Meta",
};

export const CATEGORY_LIST = [
  { value: "relapse_stories", label: "Relapse stories" },
  { value: "enablers_corner", label: "Enablers corner" },
  { value: "intervention", label: "Intervention requests" },
  { value: "success_stories", label: "Success stories" },
  { value: "meta", label: "Meta" },
] as const;
