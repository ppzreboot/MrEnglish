-- AlterTable
ALTER TABLE "user" ADD COLUMN "email" TEXT,
ADD COLUMN "password_hash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
