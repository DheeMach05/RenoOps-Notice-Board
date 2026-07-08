import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { noticeSchema } from "../../../lib/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET": {
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
      }

      case "POST": {
        const parsed = noticeSchema.safeParse(req.body);

        if (!parsed.success) {
          return res.status(400).json({
            message: "Validation failed",
            errors: parsed.error.flatten(),
          });
        }

        const {
          title,
          body,
          category,
          priority,
          publishDate,
          image,
        } = parsed.data;

        const notice = await prisma.notice.create({
          data: {
            title,
            body,
            category,
            priority,
            publishDate: new Date(publishDate),
            image: image || null,
          },
        });

        return res.status(201).json(notice);
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