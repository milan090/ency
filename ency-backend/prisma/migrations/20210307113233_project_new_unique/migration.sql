/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[id,userUid]` on the table `Project`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Project.id_userUid_unique" ON "Project"("id", "userUid");
