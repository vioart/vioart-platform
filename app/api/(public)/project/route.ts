import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        created_at: "desc",
      },

      include: {
        images: {
          orderBy: {
            is_primary: "desc",
          },
        },

        categories: {
          include: {
            category: true,
          },
        },

        techs: {
          include: {
            tech: true,
          },
        },

        details: true,

        features: {
          orderBy: {
            id: "asc",
          },
        },
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET /api/project", error);

    return NextResponse.json(
      {
        message: "Failed to fetch projects.",
      },
      {
        status: 500,
      },
    );
  }
}