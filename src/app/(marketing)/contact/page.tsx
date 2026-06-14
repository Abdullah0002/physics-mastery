import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ContactClient } from "@/components/contact/ContactClient";

export const metadata: Metadata = {
  title: `Contact — ${siteConfig.name}`,
  description:
    "Have a question or need support? Send us a message and we'll reply within 24 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactClient />;
}
