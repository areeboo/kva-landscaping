import contentJson from "@/content/content.json";

export const content = contentJson;
export type Content = typeof content;
export type Service = Content["services"][number];
export type Review = Content["reviews_featured"][number];
export type PortfolioItem = Content["portfolio"][number];
export type GalleryItem = Content["gallery"][number];
export type ProcessStep = Content["process"][number];
