-- DropForeignKey
ALTER TABLE "ProjectTechRel" DROP CONSTRAINT "ProjectTechRel_project_id_fkey";

-- AddForeignKey
ALTER TABLE "ProjectTechRel" ADD CONSTRAINT "ProjectTechRel_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
