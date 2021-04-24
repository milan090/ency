/*
  Warnings:

  - Added the required column `color` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project" ADD COLUMN     "color" TEXT NOT NULL;
