/*
  Warnings:

  - You are about to drop the column `start_date` on the `Subscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "start_date",
ADD COLUMN     "startDate" TIMESTAMP(3);
