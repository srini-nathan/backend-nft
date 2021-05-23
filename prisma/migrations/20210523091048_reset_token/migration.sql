/*
  Warnings:

  - A unique constraint covering the columns `[resetToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "resetToken" TEXT;
ALTER TABLE "User" ADD COLUMN "resetTokenExpiryAt" DATETIME;

-- CreateIndex
CREATE UNIQUE INDEX "User.resetToken_unique" ON "User"("resetToken");
