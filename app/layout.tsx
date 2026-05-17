import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { content } from "@/lib/content";
import { JsonLd } from "@/components/site/JsonLd";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-kva-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-kva-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-kva-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kvalandscaping.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: content.seo.title,
    template: "%s · KVA Landscaping",
  },
  description: content.seo.description,
  applicationName: "KVA Landscaping",
  keywords: content.seo.keywords,
  authors: [{ name: "KVA Landscaping LLC" }],
  creator: "KVA Landscaping LLC",
  openGraph: {
    title: content.seo.title,
    description: content.seo.description,
    url: siteUrl,
    siteName: "KVA Landscaping",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/portfolio/fresh-mow.jpg",
        width: 1200,
        height: 630,
        alt: "Freshly mowed striped lawn — KVA Landscaping, Sterling VA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: content.seo.title,
    description: content.seo.description,
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#f7f4ec",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <main className="flex-1">{children}</main>
        <Analytics />
        <SpeedInsights />
        <JsonLd />
      </body>
    </html>
  );
}
