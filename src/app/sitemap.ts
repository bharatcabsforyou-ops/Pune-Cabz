import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

type ChangeFreq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

const publicRoutes: {
  path: string;
  changeFrequency: ChangeFreq;
  priority: number;
}[] = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/book", changeFrequency: "daily", priority: 0.95 },
  { path: "/packages", changeFrequency: "weekly", priority: 0.9 },
  { path: "/tourism", changeFrequency: "weekly", priority: 0.9 },
  { path: "/our-services", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about/fleet", changeFrequency: "weekly", priority: 0.75 },
  { path: "/about/testimonials", changeFrequency: "weekly", priority: 0.65 },
  { path: "/about/faq", changeFrequency: "monthly", priority: 0.65 },
  { path: "/about/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/about/blog/pune-to-mumbai", changeFrequency: "monthly", priority: 0.65 },
  { path: "/about/career", changeFrequency: "monthly", priority: 0.5 },
  { path: "/about/terms", changeFrequency: "yearly", priority: 0.4 },
  { path: "/about/safety", changeFrequency: "monthly", priority: 0.6 },
  { path: "/safety", changeFrequency: "monthly", priority: 0.6 },
  { path: "/hotels", changeFrequency: "monthly", priority: 0.55 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicRoutes.map(({ path, changeFrequency, priority }) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
