// =============================================================================
// JSON-LD Structured Data generators for rich SEO snippets
// =============================================================================

import { siteConfig } from "@/config/site";

const BASE = siteConfig.url;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteConfig.name,
    url: BASE,
    logo: `${BASE}/icons/icon-512x512.png`,
    description: siteConfig.description,
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.contact.email,
      contactType: "customer support",
    },
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };
}

export function courseSchema(chapter: {
  title: string;
  slug: string;
  description: string | null;
  class: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${chapter.title} — Physics`,
    description: chapter.description ?? `Complete ${chapter.title} notes and practice for JEE & NEET`,
    provider: {
      "@type": "EducationalOrganization",
      name: siteConfig.name,
      url: BASE,
    },
    url: `${BASE}/chapters/${chapter.slug}`,
    educationalLevel: chapter.class === "XI" ? "Grade 11" : "Grade 12",
    inLanguage: "en-IN",
    teaches: [
      "Physics concepts",
      "Problem solving",
      "JEE preparation",
      "NEET preparation",
    ],
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function blogPostSchema(post: {
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: Date | null;
  readTimeMinutes: number;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ?? `${BASE}/og/default.jpg`,
    datePublished: post.publishedAt?.toISOString(),
    author: {
      "@type": "Person",
      name: post.authorName,
    },
    publisher: {
      "@type": "EducationalOrganization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${BASE}/icons/icon-512x512.png` },
    },
    url: `${BASE}/blog/${post.slug}`,
    timeRequired: `PT${post.readTimeMinutes}M`,
    inLanguage: "en-IN",
  };
}

export function breadcrumbSchema(crumbs: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${BASE}${crumb.href}`,
    })),
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    jobTitle: siteConfig.author.designation,
    worksFor: {
      "@type": "EducationalOrganization",
      name: siteConfig.name,
    },
    url: `${BASE}/faculty`,
  };
}
