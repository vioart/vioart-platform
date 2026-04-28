/*
  Warnings:

  - The `year` column on the `Certification` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `ExperienceTechRel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TechStack` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExperienceTechRel" DROP CONSTRAINT "ExperienceTechRel_experience_id_fkey";

-- DropForeignKey
ALTER TABLE "ExperienceTechRel" DROP CONSTRAINT "ExperienceTechRel_tech_id_fkey";

-- DropForeignKey
ALTER TABLE "ProjectTechRel" DROP CONSTRAINT "ProjectTechRel_project_id_fkey";

-- DropForeignKey
ALTER TABLE "ProjectTechRel" DROP CONSTRAINT "ProjectTechRel_tech_id_fkey";

-- AlterTable
ALTER TABLE "Certification" DROP COLUMN "year",
ADD COLUMN     "year" INTEGER;

-- DropTable
DROP TABLE "ExperienceTechRel";

-- DropTable
DROP TABLE "TechStack";

-- CreateTable
CREATE TABLE "Tech" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tech_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tech_name_key" ON "Tech"("name");

-- AddForeignKey
ALTER TABLE "ProjectTechRel" ADD CONSTRAINT "ProjectTechRel_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTechRel" ADD CONSTRAINT "ProjectTechRel_tech_id_fkey" FOREIGN KEY ("tech_id") REFERENCES "Tech"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
