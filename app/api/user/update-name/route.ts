import { NextResponse } from "next/server";
import { prismadb } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { userId, name } = await request.json();

    if (!userId || !name) {
      return NextResponse.json({ error: "Missing userId or name" }, { status: 400 });
    }

    await prismadb.users.update({
      where: { id: userId },
      data: { name },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update name" }, { status: 500 });
  }
}
