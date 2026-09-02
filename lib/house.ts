export function houseSlug(): string {
  const slug = process.env.CLOUDGRANT_HOUSE?.trim().toLowerCase() || "ibrahim";
  return slug;
}

export function col(table: string): string {
  return `${houseSlug()}-${table}`;
}
