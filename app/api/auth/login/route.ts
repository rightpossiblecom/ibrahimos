import { NextResponse } from "next/server";
import { verifyUser, writeSessionCookie } from "@/lib/auth-server";
import { isFirebaseAdminConfigured } from "@/lib/firebase-admin";

export async function POST(request: Request) {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json({ error: "Accounts are not connected yet." }, { status: 503 });
  }

  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const user = await verifyUser(String(body.email ?? ""), String(body.password ?? ""));
    await writeSessionCookie(user);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not sign in." },
      { status: 400 },
    );
  }
}
