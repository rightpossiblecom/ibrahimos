import type { Metadata } from "next";
import { WeatherClient } from "@/components/WeatherClient";

export const metadata: Metadata = {
  title: "Weather",
};

export default function WeatherPage() {
  return <WeatherClient />;
}
