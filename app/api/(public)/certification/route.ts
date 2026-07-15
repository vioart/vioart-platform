import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const certifications = await prisma.certification.findMany({
      include: {
        images: {
          orderBy: {
            id: "asc",
          },
        },

        skills: {
          orderBy: {
            id: "asc",
          },
        },

        categories: {
          include: {
            category: true,
          },
        },
      },

      orderBy: {
        year: "desc",
      },
    });

    return NextResponse.json(certifications);
  } catch (error) {
    console.error("GET Certifications Error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch certifications.",
      },
      {
        status: 500,
      },
    );
  }
}