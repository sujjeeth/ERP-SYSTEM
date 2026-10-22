import type { LucideIcon } from "lucide-react";

export type NavigationMetaVariant =
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "neutral";

export interface NavigationItemConfig {
  label: string;
  href?: string;
  icon: LucideIcon;

  meta?: string;
  metaDisplay?: "badge" | "text";
  metaVariant?: NavigationMetaVariant;
  showArrow?: boolean;

  children?: NavigationItemConfig[];
}

export interface NavigationSectionConfig {
  title: string;
  items: NavigationItemConfig[];
}