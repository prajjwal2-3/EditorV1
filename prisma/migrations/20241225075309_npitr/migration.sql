/*
  Warnings:

  - You are about to drop the column `deltaformat` on the `Document` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "deltaformat",
ADD COLUMN     "htmlString" TEXT;
