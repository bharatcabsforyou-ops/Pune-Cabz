"use client";

import type { ReactNode } from "react";
import { LocaleProvider } from "@/lib/i18n";
import { ContentOverridesProvider } from "@/lib/content-overrides";
import { SiteSettingsProvider } from "@/lib/site-context";
import { AdminChromeProvider } from "@/lib/admin-chrome";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ContentOverridesProvider>
      <LocaleProvider>
        <SiteSettingsProvider>
          <AdminChromeProvider>{children}</AdminChromeProvider>
        </SiteSettingsProvider>
      </LocaleProvider>
    </ContentOverridesProvider>
  );
}
