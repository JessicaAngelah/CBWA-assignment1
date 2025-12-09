import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

// GET one item
export async function GET(req: Request, { params }: any) {
  const item = await prisma.item.findUnique({
    where: { id: Number(params.id) }
  });

  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(item);
}

// UPDATE item
export async function PUT(req: Request, { params }: any) {
  const body = await req.json();
  const { title, content } = body;

  const item = await prisma.item.update({
    where: { id: Number(params.id) },
    data: { title, content }
  });

  return NextResponse.json(item);
}

// DELETE item
export async function DELETE(req: Request, { params }: any) {
  await prisma.item.delete({
    where: { id: Number(params.id) }
  });

  return NextResponse.json({ message: "Item deleted" });
}
