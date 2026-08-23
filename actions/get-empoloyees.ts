import { prismadb } from "@/lib/prisma";

export const getEmployeesCount = async () => {
  return prismadb.employees.count();
};
