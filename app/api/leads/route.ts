import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { adminDb, isFirebaseAdminConfigured } from "@/lib/firebase-admin";
import type { Lead } from "@/lib/leads";

export async function POST(request: Request) {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json({ error: "Leads are not connected yet." }, { status: 503 });
  }

  const body = (await request.json()) as Partial<Lead>;
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const form = body.form;

  if (!name || !email || !form) {
    return NextResponse.json({ error: "Name, email, and form are required." }, { status: 400 });
  }

  const lead: Lead = {
    id: String(body.id ?? "").trim() || randomUUID(),
    createdAt: new Date().toISOString(),
    form,
    name,
    email,
    phone: body.phone,
    city: body.city,
    org: body.org,
    role: body.role,
    message: body.message,
    intent: body.intent,
  };

  await adminDb().collection("leads").doc(lead.id).set(lead);
  return NextResponse.json({ lead });
}
