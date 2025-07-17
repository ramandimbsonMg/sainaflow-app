"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

export async function startTimeEntry(taskId: string) {
  const session = await getServerSession();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const timeEntry = await prisma.timeEntry.create({
    data: {
      taskId,
      userId: session.user.id,
      startTime: new Date(),
      duration: 0,
      isBillable: true,
    },
  });

  revalidatePath("/dashboard/time-tracker");
  return timeEntry;
}

export async function stopTimeEntry(entryId: string) {
  const session = await getServerSession();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const entry = await prisma.timeEntry.findUnique({
    where: { id: entryId },
  });

  if (!entry) {
    throw new Error("Time entry not found");
  }

  if (entry.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  const endTime = new Date();
  const duration = Math.floor(
    (endTime.getTime() - entry.startTime.getTime()) / 1000
  );

  const updatedEntry = await prisma.timeEntry.update({
    where: { id: entryId },
    data: {
      endTime,
      duration,
    },
  });

  // Update actual hours on the task
  const taskEntries = await prisma.timeEntry.findMany({
    where: {
      taskId: entry.taskId,
      endTime: { not: null },
    },
  });

  const totalSeconds = taskEntries.reduce((sum, e) => sum + e.duration, 0);
  const totalHours = totalSeconds / 3600;

  await prisma.tasks.update({
    where: { id: entry.taskId },
    data: { actualHours: totalHours },
  });

  revalidatePath("/dashboard/time-tracker");
  return updatedEntry;
}

export async function getWeeklyTimeEntries(userId: string) {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const entries = await prisma.timeEntry.findMany({
    where: {
      userId,
      createdAt: { gte: startOfWeek },
    },
    include: {
      task: {
        select: {
          id: true,
          title: true,
          section: true,
          assigned_section: {
            select: {
              title: true,
              board_relation: {
                select: { title: true },
              },
            },
          },
        },
      },
    },
    orderBy: { startTime: "desc" },
  });

  const totalSeconds = entries.reduce((sum, e) => sum + e.duration, 0);
  const billableSeconds = entries
    .filter((e) => e.isBillable)
    .reduce((sum, e) => sum + e.duration, 0);

  return {
    entries,
    summary: {
      totalHours: totalSeconds / 3600,
      billableHours: billableSeconds / 3600,
      nonBillableHours: (totalSeconds - billableSeconds) / 3600,
      entryCount: entries.length,
    },
  };
}

export async function getTimeEntriesByTask(taskId: string) {
  const entries = await prisma.timeEntry.findMany({
    where: { taskId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
    orderBy: { startTime: "desc" },
  });

  return entries;
}
