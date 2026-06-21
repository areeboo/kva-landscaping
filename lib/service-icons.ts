import {
  Droplet,
  Droplets,
  Flower2,
  Layers,
  LayoutGrid,
  LifeBuoy,
  PencilRuler,
  Scissors,
  Shovel,
  Snowflake,
  Sprout,
  TreeDeciduous,
  TreePine,
  Trees,
  Waves,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/** Shared icon map for service `icon` keys in content.json. */
export const serviceIconMap: Record<string, LucideIcon> = {
  Scissors,
  Sprout,
  Layers,
  Shovel,
  Flower2,
  Trees,
  LayoutGrid,
  PencilRuler,
  TreePine,
  TreeDeciduous,
  Droplets,
  Wrench,
  Droplet,
  Waves,
  LifeBuoy,
  Snowflake,
};

export function getServiceIcon(name: string): LucideIcon {
  return serviceIconMap[name] ?? Sprout;
}

/** Canonical display order for service categories. */
export const serviceCategoryOrder = [
  "Lawn Care",
  "Planting & Beds",
  "Hardscape",
  "Tree & Shrub",
  "Irrigation & Water",
  "Seasonal",
] as const;
