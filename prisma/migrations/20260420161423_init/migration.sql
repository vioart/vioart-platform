-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "remember_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "project_url" TEXT,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectImage" (
    "id" SERIAL NOT NULL,
    "image_url" TEXT NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "ProjectImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectDetail" (
    "id" SERIAL NOT NULL,
    "problem" TEXT,
    "solution" TEXT,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "ProjectDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectFeature" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "ProjectFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechStack" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TechStack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectTechRel" (
    "project_id" INTEGER NOT NULL,
    "tech_id" INTEGER NOT NULL,

    CONSTRAINT "ProjectTechRel_pkey" PRIMARY KEY ("project_id","tech_id")
);

-- CreateTable
CREATE TABLE "ProjectCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "ProjectCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectCategoryRel" (
    "project_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "ProjectCategoryRel_pkey" PRIMARY KEY ("project_id","category_id")
);

-- CreateTable
CREATE TABLE "Certification" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "issuer" TEXT,
    "year" TEXT,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "source_url" TEXT,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CertificationImage" (
    "id" SERIAL NOT NULL,
    "image_url" TEXT NOT NULL,
    "certification_id" INTEGER NOT NULL,

    CONSTRAINT "CertificationImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CertificationSkill" (
    "id" SERIAL NOT NULL,
    "skill" TEXT NOT NULL,
    "certification_id" INTEGER NOT NULL,

    CONSTRAINT "CertificationSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "description" TEXT,
    "type" TEXT,
    "certificate_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperiencePoint" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "experience_id" INTEGER NOT NULL,

    CONSTRAINT "ExperiencePoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperienceTechRel" (
    "experience_id" INTEGER NOT NULL,
    "tech_id" INTEGER NOT NULL,

    CONSTRAINT "ExperienceTechRel_pkey" PRIMARY KEY ("experience_id","tech_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectDetail_project_id_key" ON "ProjectDetail"("project_id");

-- CreateIndex
CREATE UNIQUE INDEX "TechStack_name_key" ON "TechStack"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectCategory_slug_key" ON "ProjectCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Certification_slug_key" ON "Certification"("slug");

-- AddForeignKey
ALTER TABLE "ProjectImage" ADD CONSTRAINT "ProjectImage_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectDetail" ADD CONSTRAINT "ProjectDetail_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectFeature" ADD CONSTRAINT "ProjectFeature_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTechRel" ADD CONSTRAINT "ProjectTechRel_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTechRel" ADD CONSTRAINT "ProjectTechRel_tech_id_fkey" FOREIGN KEY ("tech_id") REFERENCES "TechStack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCategoryRel" ADD CONSTRAINT "ProjectCategoryRel_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCategoryRel" ADD CONSTRAINT "ProjectCategoryRel_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "ProjectCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificationImage" ADD CONSTRAINT "CertificationImage_certification_id_fkey" FOREIGN KEY ("certification_id") REFERENCES "Certification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificationSkill" ADD CONSTRAINT "CertificationSkill_certification_id_fkey" FOREIGN KEY ("certification_id") REFERENCES "Certification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperiencePoint" ADD CONSTRAINT "ExperiencePoint_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienceTechRel" ADD CONSTRAINT "ExperienceTechRel_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienceTechRel" ADD CONSTRAINT "ExperienceTechRel_tech_id_fkey" FOREIGN KEY ("tech_id") REFERENCES "TechStack"("id") ON DELETE CASCADE ON UPDATE CASCADE;
