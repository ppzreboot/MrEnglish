-- CreateTable
CREATE TABLE "mw_cache" (
    "key" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "valid" BOOLEAN NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mw_cache_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "identity" (
    "provider" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "identity_pkey" PRIMARY KEY ("provider","provider_id")
);

-- AddForeignKey
ALTER TABLE "identity" ADD CONSTRAINT "identity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
