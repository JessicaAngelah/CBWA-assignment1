// example for App Router: src/app/api/items/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const start = Date.now();
  try {
    const body = await req.json();
    // Example: save to prisma or file. For demo, simulate DB latency:
    await new Promise((r) => setTimeout(r, 120));
    // Log basic instrumentation
    console.log("[metrics] api=POST /api/items", { durationMs: Date.now() - start, size: JSON.stringify(body).length });
    // TODO: call prisma to actually create record
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[error] /api/items", err);
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}
