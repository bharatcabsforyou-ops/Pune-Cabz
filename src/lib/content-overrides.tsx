"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  contentImageKey,
  getDefaultSiteImages,
  isContentImageKey,
  type ContentOverrides,
} from "@/lib/admin-content-pages";
import { useLocale } from "@/lib/i18n";

const empty: ContentOverrides = { en: {}, hi: {}, mr: {} };

const ContentOverridesContext = createContext<ContentOverrides>(empty);

export function ContentOverridesProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<ContentOverrides>(empty);

  useEffect(() => {
    fetch("/api/site-content")
      .then((res) => res.json())
      .then((data: { overrides?: ContentOverrides }) => {
        if (data.overrides) setOverrides(data.overrides);
      })
      .catch(() => {});
  }, []);

  const value = useMemo(() => overrides, [overrides]);

  return (
    <ContentOverridesContext.Provider value={value}>{children}</ContentOverridesContext.Provider>
  );
}

export function useContentOverrides() {
  return useContext(ContentOverridesContext);
}

/** Resolved page/section images from CMS (falls back to defaults). */
export function useSiteImage(imageId: string, fallback?: string) {
  const overrides = useContentOverrides();
  const { locale } = useLocale();
  const defaults = useMemo(() => getDefaultSiteImages(), []);
  const key = contentImageKey(imageId);

  const fromLocale = overrides[locale]?.[key];
  const fromEn = overrides.en?.[key];
  const resolved =
    (typeof fromLocale === "string" && fromLocale.trim()) ||
    (typeof fromEn === "string" && fromEn.trim()) ||
    fallback ||
    defaults[imageId] ||
    "";

  return resolved;
}

export function useSiteImagesMap() {
  const overrides = useContentOverrides();
  const { locale } = useLocale();
  const defaults = useMemo(() => getDefaultSiteImages(), []);

  return useMemo(() => {
    const map = { ...defaults };
    const apply = (bucket?: Partial<Record<string, string>>) => {
      if (!bucket) return;
      for (const [key, value] of Object.entries(bucket)) {
        if (!isContentImageKey(key) || !value?.trim()) continue;
        map[key.slice(4)] = value.trim();
      }
    };
    apply(overrides.en);
    apply(overrides[locale]);
    return map;
  }, [defaults, locale, overrides]);
}
