"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { site } from "@/lib/site";
import { defaultSiteSettings, type SiteSettings } from "@/lib/site-settings";

type SiteContextValue = SiteSettings & {
  name: string;
  mapsUrl: string;
  mapEmbed: string;
  heroVideoUrl: string;
  url: string;
};

const SiteContext = createContext<SiteContextValue>({
  ...defaultSiteSettings(),
  name: site.name,
  mapsUrl: site.mapsUrl,
  mapEmbed: site.mapEmbed,
  heroVideoUrl: site.heroVideoUrl,
  url: site.url,
});

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings());

  useEffect(() => {
    fetch("/api/site-settings")
      .then((res) => res.json())
      .then((data: { settings?: SiteSettings }) => {
        if (data.settings) setSettings(data.settings);
      })
      .catch(() => {});
  }, []);

  const value = useMemo<SiteContextValue>(
    () => ({
      ...settings,
      name: site.name,
      mapsUrl: site.mapsUrl,
      mapEmbed: site.mapEmbed,
      heroVideoUrl: site.heroVideoUrl,
      url: site.url,
    }),
    [settings]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  return useContext(SiteContext);
}
