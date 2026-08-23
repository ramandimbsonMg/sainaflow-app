import { prismadb } from "@/lib/prisma";

export const getStorageSize = async () => {
  const data = await prismadb.documents.aggregate({
    _sum: { size: true },
  });

  const storageSizeMB = (data._sum.size ?? 0) / 1000000;

  return Math.round(storageSizeMB * 100) / 100;
};
