import { NextResponse } from "next/server";
import { generateTabsHTML } from "@/lib/generator";

export async function POST(req: Request) {
  const body = await req.json();
  const html = generateTabsHTML(body.tabs || [], body.active || 0);
  return new NextResponse(html, { status: 200, headers: { "content-type": "text/html" }});
}
