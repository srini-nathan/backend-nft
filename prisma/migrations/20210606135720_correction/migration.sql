/*
  Warnings:

  - You are about to drop the column `ipfsItemHash` on the `Ipfs` table. All the data in the column will be lost.
  - You are about to drop the column `itemName` on the `Ipfs` table. All the data in the column will be lost.
  - You are about to drop the column `itemDescription` on the `Ipfs` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Ipfs.ipfsItemHash_unique";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ipfs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ipfsHash" TEXT NOT NULL,
    "isMinted" BOOLEAN NOT NULL DEFAULT false,
    "nFTId" TEXT,
    FOREIGN KEY ("nFTId") REFERENCES "NFT" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Ipfs" ("id", "ipfsHash", "isMinted", "nFTId") SELECT "id", "ipfsHash", "isMinted", "nFTId" FROM "Ipfs";
DROP TABLE "Ipfs";
ALTER TABLE "new_Ipfs" RENAME TO "Ipfs";
CREATE UNIQUE INDEX "Ipfs.ipfsHash_unique" ON "Ipfs"("ipfsHash");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
