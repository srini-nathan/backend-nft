/*
  Warnings:

  - You are about to drop the column `isMinted` on the `Ipfs` table. All the data in the column will be lost.
  - You are about to drop the column `isAssetReady` on the `Ipfs` table. All the data in the column will be lost.
  - Added the required column `assetIndex` to the `Ipfs` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ipfs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ipfsHash" TEXT NOT NULL,
    "assetIndex" TEXT NOT NULL,
    "walletAddress" TEXT,
    "nFTId" TEXT,
    FOREIGN KEY ("nFTId") REFERENCES "NFT" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Ipfs" ("id", "ipfsHash", "walletAddress", "nFTId") SELECT "id", "ipfsHash", "walletAddress", "nFTId" FROM "Ipfs";
DROP TABLE "Ipfs";
ALTER TABLE "new_Ipfs" RENAME TO "Ipfs";
CREATE UNIQUE INDEX "Ipfs.ipfsHash_unique" ON "Ipfs"("ipfsHash");
CREATE UNIQUE INDEX "Ipfs.assetIndex_unique" ON "Ipfs"("assetIndex");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
