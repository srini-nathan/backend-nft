-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "invitedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmedAt" DATETIME,
    "signupToken" TEXT,
    "signupTokenExpiryAt" DATETIME,
    "role" TEXT NOT NULL DEFAULT 'Creator'
);
INSERT INTO "new_User" ("id", "email", "password", "active", "invitedAt", "createdAt", "updatedAt", "confirmedAt", "signupToken", "signupTokenExpiryAt", "role") SELECT "id", "email", "password", "active", "invitedAt", "createdAt", "updatedAt", "confirmedAt", "signupToken", "signupTokenExpiryAt", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
CREATE UNIQUE INDEX "User.signupToken_unique" ON "User"("signupToken");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
