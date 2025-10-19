import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

export default function SEO({
  title = "BrandVelocity | Leading Marketing & Branding Agency in Devon & Cornwall",
  description = "Award-winning marketing and branding agency serving Devon and Cornwall. Expert brand strategy, digital marketing, and creative services for businesses across Exeter, Plymouth, Torquay, and the South West.",
  keywords = "branding agency Devon, marketing agency Exeter, digital marketing Plymouth, branding Cornwall, marketing agency South West, brand strategy Devon, creative agency Exeter, marketing consultancy Cornwall",
  ogImage = "/nebula-hero.jpg",
  ogType = "website",
  canonicalUrl,
}: SEOProps) {
  const siteUrl = "https://brandvelocity.co.uk";
  const fullTitle = title.includes("BrandVelocity") ? title : `${title} | BrandVelocity`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl || siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content="BrandVelocity" />
      <meta property="og:locale" content="en_GB" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl || siteUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}${ogImage}`} />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="BrandVelocity" />

      {/* Geo Tags for Local SEO */}
      <meta name="geo.region" content="GB-DEV" />
      <meta name="geo.placename" content="Devon" />
      <meta name="geo.position" content="50.7184;-3.5339" />
      <meta name="ICBM" content="50.7184, -3.5339" />

      {/* Schema.org markup for Local Business */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "BrandVelocity",
          "description": description,
          "url": siteUrl,
          "logo": `${siteUrl}/logo.png`,
          "image": `${siteUrl}${ogImage}`,
          "priceRange": "££",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "Devon",
            "addressCountry": "GB"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "50.7184",
            "longitude": "-3.5339"
          },
          "areaServed": [
            {
              "@type": "City",
              "name": "Exeter"
            },
            {
              "@type": "City",
              "name": "Plymouth"
            },
            {
              "@type": "City",
              "name": "Torquay"
            },
            {
              "@type": "State",
              "name": "Devon"
            },
            {
              "@type": "State",
              "name": "Cornwall"
            }
          ],
          "serviceType": ["Brand Strategy", "Digital Marketing", "Content Creation", "Social Media Marketing", "SEO Services"],
          "sameAs": [
            "https://www.facebook.com/brandvelocity",
            "https://www.twitter.com/brandvelocity",
            "https://www.instagram.com/brandvelocity",
            "https://www.linkedin.com/company/brandvelocity"
          ]
        })}
      </script>
    </Helmet>
  );
}

