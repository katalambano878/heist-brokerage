-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'sale',
ADD COLUMN     "region" TEXT NOT NULL DEFAULT '';
