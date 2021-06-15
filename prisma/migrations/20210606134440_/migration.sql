/*
  Warnings:

  - Added the required column `ipfsItemHash` to the `Ipfs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemName` to the `Ipfs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemDescription` to the `Ipfs` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ipfs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ipfsHash" TEXT NOT NULL,
    "ipfsItemHash" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "itemDescription" TEXT NOT NULL,
    "isMinted" BOOLEAN NOT NULL DEFAULT false,
    "nFTId" TEXT,
    FOREIGN KEY ("nFTId") REFERENCES "NFT" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Ipfs" ("id", "ipfsHash", "isMinted", "nFTId") SELECT "id", "ipfsHash", "isMinted", "nFTId" FROM "Ipfs";
DROP TABLE "Ipfs";
ALTER TABLE "new_Ipfs" RENAME TO "Ipfs";
CREATE UNIQUE INDEX "Ipfs.ipfsHash_unique" ON "Ipfs"("ipfsHash");
CREATE UNIQUE INDEX "Ipfs.ipfsItemHash_unique" ON "Ipfs"("ipfsItemHash");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
