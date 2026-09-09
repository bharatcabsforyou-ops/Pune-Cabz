"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AdminChromeValue = {
  /** When true, site Navbar/Footer/floats are hidden (logged-in dashboard). */
  hideSiteChrome: boolean;
  setHideSiteChrome: (hide: boolean) => void;
};

const AdminChromeContext = createContext<AdminChromeValue>({
  hideSiteChrome: false,
  setHideSiteChrome: () => {},
});

export function AdminChromeProvider({ children }: { children: ReactNode }) {
  const [hideSiteChrome, setHideSiteChrome] = useState(false);
  const value = useMemo(
    () => ({ hideSiteChrome, setHideSiteChrome }),
    [hideSiteChrome]
  );
  return (
    <AdminChromeContext.Provider value={value}>{children}</AdminChromeContext.Provider>
  );
}

export function useAdminChrome() {
  return useContext(AdminChromeContext);
}

/** Sync hide flag from admin page auth state. */
export function useSyncAdminChrome(authed: boolean | null) {
  const { setHideSiteChrome } = useAdminChrome();
  useEffect(() => {
    setHideSiteChrome(authed === true);
    return () => setHideSiteChrome(false);
  }, [authed, setHideSiteChrome]);
}
