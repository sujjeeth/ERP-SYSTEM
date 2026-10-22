
import { SidebarItem } from "@/components/shell/SidebarItem";
import { cn } from "@/lib/utils";
import type {
  NavigationItemConfig,
  NavigationSectionConfig,
} from "./navigation-types";

interface SidebarSectionProps {
  section: NavigationSectionConfig;
  collapsed: boolean;
  activePath: string;
  activeFlyout: string | null;
  onModuleEnter: (label: string) => void;
  onModuleLeave: (label: string) => void;
  onFlyoutEnter: (label: string) => void;
  onFlyoutLeave: (label: string) => void;
  onModuleClick: (label: string) => void;
  onQuickCreate?: (item: NavigationItemConfig) => void;
}

export function SidebarSection({
  section,
  collapsed,
  activePath,
  activeFlyout,
  onModuleEnter,
  onModuleLeave,
  onFlyoutEnter,
  onFlyoutLeave,
  onModuleClick,
  onQuickCreate,
}: SidebarSectionProps) {
  return (
    <section className="mb-3">
      {!collapsed && (
        <h2
          className={cn(
            "mb-1.5 px-2 text-[9px] font-semibold",
            "leading-4 tracking-[0.08em] text-[#8793A8]"
          )}
        >
          {section.title}
        </h2>
      )}

      <div className="space-y-0.5">
        {section.items.map((item) => (
          <SidebarItem
            key={item.label}
            item={item}
            collapsed={collapsed}
            activePath={activePath}
            activeFlyout={activeFlyout}
            onModuleEnter={onModuleEnter}
            onModuleLeave={onModuleLeave}
            onFlyoutEnter={onFlyoutEnter}
            onFlyoutLeave={onFlyoutLeave}
            onModuleClick={onModuleClick}
            onQuickCreate={onQuickCreate}
          />
        ))}
      </div>
    </section>
  );
}

export default SidebarSection;
