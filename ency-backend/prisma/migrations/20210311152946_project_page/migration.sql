/*
  Warnings:

  - You are about to drop the `ProjecPage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjecPage" DROP CONSTRAINT "ProjecPage_projectId_fkey";

-- DropTable
DROP TABLE "ProjecPage";

-- CreateTable
CREATE TABLE "ProjectPage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "projectId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectPage" ADD FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
