import type { Metadata } from "next";
import PricingCalculator from "@/components/PricingCalculator";

export const metadata: Metadata = {
  title: "Pricing • BrandME",
  description:
    "Simple, affordable pricing for BrandME web design packages. Starting at $150 setup plus a small monthly fee — pick a package or build a custom quote.",
  keywords: [
    "website pricing",
    "web design packages",
    "affordable web design",
    "website cost calculator",
  ],
  openGraph: {
    title: "Pricing • BrandME",
    description:
      "Plans from $150 setup plus a small monthly fee. No agency markups, no hidden charges.",
    url: "https://brandme.com.ng/pricing",
    siteName: "BrandME",
    type: "website",
  },
};

export default function PricingPage() {
  return <PricingCalculator />;
}
