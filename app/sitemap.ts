import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const paths = [
  "/",
  "/product",
  "/how-it-works",
  "/pricing",
  "/team",
  "/about",
  "/season-notes",
  "/the-farm",
  "/features",
  "/solutions",
  "/customers",
  "/resources",
  "/help",
  "/blog",
  "/blog/northern-blight-before-the-rains",
  "/blog/when-to-sell-maize-this-month",
  "/blog/offline-habits-for-the-field",
  "/security",
  "/privacy",
  "/terms",
  "/demo",
  "/early-access",
  "/waitlist",
  "/login",
  "/signup",
  "/dashboard",
  "/new",
  "/fields",
  "/market",
  "/weather",
  "/account",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = `https://${siteConfig.domain}`;
  return paths.map((path) => ({
    url: path === "/" ? origin : `${origin}${path}`,
    changeFrequency: "weekly",
    priority: path === "/" || path === "/product" || path === "/team" ? 1 : 0.7,
  }));
}
