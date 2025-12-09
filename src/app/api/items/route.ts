import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

// GET all items
export async function GET() {
  const items = await prisma.item.findMany({
    orderBy: { id: "desc" }
  });
  return NextResponse.json(items);
}

// CREATE new item
export async function POST(req: Request) {
  const body = await req.json();
  const { title, content } = body;

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const item = await prisma.item.create({
    data: { title, content }
  });

  return NextResponse.json(item);
}
