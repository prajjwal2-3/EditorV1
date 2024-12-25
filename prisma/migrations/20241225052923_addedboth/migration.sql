/*
  Warnings:

  - You are about to drop the column `content` on the `Document` table. All the data in the column will be lost.
  - Added the required column `deltaformat` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `htmlString` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "content",
ADD COLUMN     "deltaformat" TEXT NOT NULL,
ADD COLUMN     "htmlString" TEXT NOT NULL;
