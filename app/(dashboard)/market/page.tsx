import type { Metadata } from "next";
import { MarketClient } from "@/components/MarketClient";

export const metadata: Metadata = {
  title: "Market",
};

export default function MarketPage() {
  return <MarketClient />;
}
