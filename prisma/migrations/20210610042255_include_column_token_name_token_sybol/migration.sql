/*
  Warnings:

  - Added the required column `tokenName` to the `Ipfs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenSymbol` to the `Ipfs` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ipfs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ipfsHash" TEXT NOT NULL,
    "tokenName" TEXT NOT NULL,
    "tokenSymbol" TEXT NOT NULL,
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
