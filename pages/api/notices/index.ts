import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      message: "Method Not Allowed",
    });
  }

  try {
    const notices = await prisma.notice.findMany({
      orderBy: [
        {
          priority: "desc",
        },
        {
          publishDate: "desc",
        },
      ],
    });

    return res.status(200).json(notices);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch notices.",
    });
  }
}