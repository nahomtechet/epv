import { NextResponse } from "next/server";
import { checkSystemHealth } from "ethiopian-payment-verifier";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const checks = await checkSystemHealth();

  return NextResponse.json({
    status: "ok",
    banks: checks,
  });
}
