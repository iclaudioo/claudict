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

export const CATEGORY_META: Record<string, { label: string; color: string; activeColor: string; icon: string }> = {
  relapse_stories: {
    label: "Relapse stories",
    color: "text-red-400 border-red-400/30",
    activeColor: "text-red-400 border-red-400 bg-red-400/10",
    icon: "syringe",
  },
  enablers_corner: {
    label: "Enablers corner",
    color: "text-purple-400 border-purple-400/30",
    activeColor: "text-purple-400 border-purple-400 bg-purple-400/10",
    icon: "megaphone",
  },
  intervention: {
    label: "Intervention requests",
    color: "text-amber-400 border-amber-400/30",
    activeColor: "text-amber-400 border-amber-400 bg-amber-400/10",
    icon: "alert",
  },
  success_stories: {
    label: "Success stories",
    color: "text-emerald-400 border-emerald-400/30",
    activeColor: "text-emerald-400 border-emerald-400 bg-emerald-400/10",
    icon: "heart",
  },
  meta: {
    label: "Meta",
    color: "text-blue-400 border-blue-400/30",
    activeColor: "text-blue-400 border-blue-400 bg-blue-400/10",
    icon: "settings",
  },
};
