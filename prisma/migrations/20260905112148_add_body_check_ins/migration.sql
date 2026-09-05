-- CreateTable
CREATE TABLE "BodyCheckIn" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "waist" DOUBLE PRECISION,
    "bodyFat" DOUBLE PRECISION,
    "note" TEXT,
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BodyCheckIn_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BodyCheckIn_userId_checkedAt_idx" ON "BodyCheckIn"("userId", "checkedAt");

-- AddForeignKey
ALTER TABLE "BodyCheckIn" ADD CONSTRAINT "BodyCheckIn_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
