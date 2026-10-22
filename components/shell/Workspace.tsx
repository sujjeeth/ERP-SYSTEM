import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface WorkspaceProps {
  children: ReactNode;
  className?: string;
}

export function Workspace({
  children,
  className,
}: WorkspaceProps) {
  return (
    <main
      id="main-content"
      className={cn(
        "relative min-w-0 flex-1",
        "bg-[#F5F6F8]",
        "p-3 lg:p-[14px]",
        className
      )}
    >
      {children}
    </main>
  );
}

export default Workspace;   