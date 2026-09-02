import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { readDesk, resetDesk, writeDesk, type DeskState } from "@/lib/desk-server";
import { isFirebaseAdminConfigured } from "@/lib/firebase-admin";

async function requireUser() {
  const user = await getRequestUser();
  if (!user) {
    return { user: null, error: NextResponse.json({ error: "Sign in to continue." }, { status: 401 }) };
  }
  if (!isFirebaseAdminConfigured()) {
    return {
      user: null,
      error: NextResponse.json({ error: "The farm desk is not connected yet." }, { status: 503 }),
    };
  }
  return { user, error: null };
}

export async function GET() {
  const { user, error } = await requireUser();
  if (!user) return error;
  return NextResponse.json(await readDesk(user.uid));
}

export async function PUT(request: Request) {
  const { user, error } = await requireUser();
  if (!user) return error;

  const body = (await request.json()) as Partial<DeskState>;
  const next = await writeDesk(user.uid, {
    live: Boolean(body.live),
    incident: body.incident ?? null,
    assessments: Array.isArray(body.assessments) ? body.assessments : [],
  });
  return NextResponse.json(next);
}

export async function DELETE() {
  const { user, error } = await requireUser();
  if (!user) return error;
  return NextResponse.json(await resetDesk(user.uid));
}
