import type { MetadataRoute } from "next";
import { content } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kvalandscaping.com";
  const now = new Date();

  const home: MetadataRoute.Sitemap[number] = {
    url: base,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1,
  };

  const indexes: MetadataRoute.Sitemap = [
    {
      url: `${base}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${base}/locations`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  const services: MetadataRoute.Sitemap = content.services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const locations: MetadataRoute.Sitemap = content.business.service_area_zips.map((c) => ({
    url: `${base}/locations/${c.city.toLowerCase().replace(/\s+/g, "-")}-va`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [home, ...indexes, ...services, ...locations];
}
