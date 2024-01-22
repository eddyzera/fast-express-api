/*
  Warnings:

  - You are about to drop the column `customer_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `_OrderToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_B_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_customer_id_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "customer_id";

-- DropTable
DROP TABLE "_OrderToProduct";

-- CreateTable
CREATE TABLE "_OdersToProducts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OdersToProducts_AB_unique" ON "_OdersToProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_OdersToProducts_B_index" ON "_OdersToProducts"("B");

-- AddForeignKey
ALTER TABLE "_OdersToProducts" ADD CONSTRAINT "_OdersToProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OdersToProducts" ADD CONSTRAINT "_OdersToProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
