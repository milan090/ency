-- CreateTable
CREATE TABLE "PreLaunchEmail" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdData" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PreLaunchEmail.email_unique" ON "PreLaunchEmail"("email");
