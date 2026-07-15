import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      include: {
        points: {
          orderBy: {
            id: "asc",
          },
        },
      },
      orderBy: {
        start_date: "desc",
      },
    });

    return NextResponse.json(experiences);
  } catch (error) {
    console.error("GET Experience Error:", error);

    return NextResponse.json(
      {
        message: "Gagal mengambil data pengalaman.",
      },
      {
        status: 500,
      },
    );
  }
}