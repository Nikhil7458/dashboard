// app/api/tasks/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";   // ← import the options object

export async function POST(request: Request) {
  // Use getServerSession instead of auth()
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { title } = await request.json();

  if (!title || typeof title !== "string" || title.trim().length < 1) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  await prisma.task.create({
    data: {
      title: title.trim(),
      status: "TODO",
      userId: session.user.id,
    },
  });

  return NextResponse.json({ success: true });
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { id, status } = await request.json();

  if (!id || !["TODO", "IN_PROGRESS", "DONE"].includes(status)) {
    return NextResponse.json({ error: "Wrong data" }, { status: 400 });
  }

  const task = await prisma.task.findUnique({ where: { id } });

  if (!task || task.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.task.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json({ success: true });
}