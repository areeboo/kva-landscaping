import { content } from "@/lib/content";

export function JsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kvalandscaping.com";

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LandscapingBusiness",
    "@id": `${siteUrl}#business`,
    name: content.business.display_name,
    alternateName: content.business.legal_name,
    url: siteUrl,
    telephone: content.business.phone_primary,
    email: content.business.email,
    image: [
      `${siteUrl}/images/portfolio/fresh-mow.jpg`,
      `${siteUrl}/images/portfolio/brick-home-shrubs.jpg`,
      `${siteUrl}/images/portfolio/lawn-after.jpg`,
      `${siteUrl}/images/portfolio/lawn-before.jpg`,
    ],
    logo: `${siteUrl}/icon.png`,
    priceRange: "$$",
    paymentAccepted: content.business.payment_methods.join(", "),
    currenciesAccepted: "USD",
    slogan: content.hero.tagline,
    foundingDate: String(new Date().getFullYear() - content.business.years_in_business),
    address: {
      "@type": "PostalAddress",
      addressLocality: content.business.city,
      addressRegion: content.business.state,
      postalCode: content.business.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 38.970333,
      longitude: -77.4217115,
    },
    areaServed: [
      {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 38.970333,
          longitude: -77.4217115,
        },
        geoRadius: String(content.business.service_area_radius_mi * 1609),
      },
      ...content.business.service_area_zips.map((c) => ({
        "@type": "City" as const,
        name: c.city,
        containedInPlace: {
          "@type": "AdministrativeArea" as const,
          name: c.city === "Sterling" || c.city === "Leesburg" || c.city === "Ashburn" ? "Loudoun County" : "Fairfax County",
        },
      })),
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(content.review_aggregate.weighted_rating),
      reviewCount: String(content.review_aggregate.total_review_count),
      bestRating: "5",
      worstRating: "1",
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "16:00" },
    ],
    sameAs: [content.business.socials.facebook, content.business.socials.yelp, content.business.socials.thumbtack],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Landscape services",
      itemListElement: content.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.blurb },
      })),
    },
  };

  const reviewSchema = content.reviews_featured.slice(0, 5).map((r) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "LocalBusiness", name: content.business.display_name },
    author: { "@type": "Person", name: r.author },
    reviewRating: { "@type": "Rating", ratingValue: String(r.rating), bestRating: "5" },
    reviewBody: r.text,
    publisher: { "@type": "Organization", name: r.source },
  }));

  // Per-service Service[] schema, each linked to the LandscapingBusiness as provider
  const serviceSchema = content.services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: s.title,
    name: s.title,
    description: s.blurb,
    category: "Landscaping",
    provider: { "@id": `${siteUrl}#business` },
    areaServed: content.business.service_area_zips.map((c) => ({
      "@type": "City" as const,
      name: c.city,
    })),
    url: `${siteUrl}/services/${s.slug}`,
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
