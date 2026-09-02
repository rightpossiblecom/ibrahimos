import type { Metadata } from "next";
import { FieldsClient } from "@/components/FieldsClient";

export const metadata: Metadata = {
  title: "Fields",
};

export default function FieldsPage() {
  return <FieldsClient />;
}
