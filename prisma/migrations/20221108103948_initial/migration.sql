-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "parentAccount" TEXT,
    "crmId" TEXT,
    "localTimeZone" TEXT,
    "locale" TEXT NOT NULL DEFAULT 'en_US',
    "status" TEXT,
    "creatorId" TEXT,
    "creator" TEXT
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "localTimeZone" TEXT,
    "locale" TEXT NOT NULL DEFAULT 'en_US'
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_id_key" ON "Account"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
