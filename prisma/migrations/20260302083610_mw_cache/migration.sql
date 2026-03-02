-- CreateTable
CREATE TABLE "mw_cache" (
    "key" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "valid" BOOLEAN NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mw_cache_pkey" PRIMARY KEY ("key")
);
