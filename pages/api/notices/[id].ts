import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { noticeSchema } from "../../../lib/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "Invalid notice ID.",
    });
  }

  try {
    switch (req.method) {
      case "PUT": {
        const parsed = noticeSchema.safeParse(req.body);

        if (!parsed.success) {
          return res.status(400).json({
            message: "Validation failed",
            errors: parsed.error.flatten(),
          });
        }

        const notice = await prisma.notice.update({
          where: {
            id,
          },
          data: {
            ...parsed.data,
            publishDate: new Date(parsed.data.publishDate),
            image: parsed.data.image || null,
          },
        });

        return res.status(200).json(notice);
      }

      case "DELETE": {
        await prisma.notice.delete({
          where: {
            id,
          },
        });

        return res.status(204).end();
      }

      default:
        return res.status(405).json({
          message: "Method Not Allowed",
        });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}