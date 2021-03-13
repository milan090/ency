/*
  Warnings:

  - Added the required column `data` to the `ProjecPage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjecPage" ADD COLUMN     "data" JSONB NOT NULL;
