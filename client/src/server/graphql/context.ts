import { PrismaClient } from ".prisma/client";
import { Session } from "next-auth";

export interface GraphQLContext {
  user?: Session;
  prisma: PrismaClient;
  origin: string;
}
