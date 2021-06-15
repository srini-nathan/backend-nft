-- CreateTable
CREATE TABLE "NFT" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ipfs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ipfsHash" TEXT NOT NULL,
    "isMinted" BOOLEAN NOT NULL DEFAULT false,
    "nFTId" TEXT,
    FOREIGN KEY ("nFTId") REFERENCES "NFT" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "NFT_userId_unique" ON "NFT"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Ipfs.ipfsHash_unique" ON "Ipfs"("ipfsHash");
