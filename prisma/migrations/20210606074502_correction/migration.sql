/*
  Warnings:

  - Made the column `nFTId` on table `Ipfs` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ipfs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ipfsHash" TEXT NOT NULL,
    "isMinted" BOOLEAN NOT NULL DEFAULT false,
    "nFTId" TEXT NOT NULL,
    FOREIGN KEY ("nFTId") REFERENCES "NFT" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Ipfs" ("id", "ipfsHash", "isMinted", "nFTId") SELECT "id", "ipfsHash", "isMinted", "nFTId" FROM "Ipfs";
DROP TABLE "Ipfs";
ALTER TABLE "new_Ipfs" RENAME TO "Ipfs";
CREATE UNIQUE INDEX "Ipfs.ipfsHash_unique" ON "Ipfs"("ipfsHash");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
