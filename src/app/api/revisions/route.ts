import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const revisions = await prisma.revision.findMany();
  return NextResponse.json(revisions);
}

export async function POST(req: Request) {
  const data = await req.json();
  const revision = await prisma.revision.create({ data });
  return NextResponse.json(revision);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.revision.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

export async function PUT(req: Request) {
  const { id, ...data } = await req.json();
  const revision = await prisma.revision.update({ where: { id }, data });
  return NextResponse.json(revision);
}
