
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type TopBarPopupId =
  | "home"
  | "search"
  | "favorite"
  | "watchlist"
  | "branch"
  | "quick-create"
  | "notifications"
  | "profile";

interface TopBarPopupContextValue {
  activePopup: TopBarPopupId | null;
  setPopupOpen: (
    id: TopBarPopupId,
    open: boolean
  ) => void;
}

const TopBarPopupContext =
  createContext<TopBarPopupContextValue | null>(null);

export function TopBarPopupProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [activePopup, setActivePopup] =
    useState<TopBarPopupId | null>(null);

  const setPopupOpen = useCallback(
    (id: TopBarPopupId, open: boolean) => {
      setActivePopup((current) =>
        open ? id : current === id ? null : current
      );
    },
    []
  );

  const value = useMemo(
    () => ({ activePopup, setPopupOpen }),
    [activePopup, setPopupOpen]
  );

  return (
    <TopBarPopupContext.Provider value={value}>
      {children}
    </TopBarPopupContext.Provider>
  );
}

export function useTopBarPopup(id: TopBarPopupId) {
  const context = useContext(TopBarPopupContext);

  // Components can still work independently outside the top bar.
  const [localOpen, setLocalOpen] = useState(false);

  const open = context
    ? context.activePopup === id
    : localOpen;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (context) {
        context.setPopupOpen(id, nextOpen);
      } else {
        setLocalOpen(nextOpen);
      }
    },
    [context, id]
  );

  return [open, setOpen] as const;
}
