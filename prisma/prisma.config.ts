import type { PrismaConfig } from "@prisma/config";

export default {
  datasources: {
    db: {
      url: "file:./prisma/dev.db",
    },
  },
} satisfies PrismaConfig;
