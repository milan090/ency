/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[email]` on the table `User`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
