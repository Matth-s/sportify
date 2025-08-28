import { Request, Response } from 'express';
import prisma from '../../lib/prisma';

export const getGroupController = async (
  req: Request,
  res: Response
) => {
  const limit = 20;
  const { user } = req;

  const cursor = req.query.cursor
    ? { id: req.query.cursor as string }
    : undefined;

  console.log(cursor);

  try {
    const groups = await prisma.group.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { members: true } },
        members: {
          where: { NOT: { role: 'BANNED' }, userId: user.userId },
          select: { role: true },
        },
        joinRequest: { where: { userId: user.userId } },
      },
    });

    let nextCursor: string | null = null;
    if (groups.length > limit) {
      const nextItem = groups.pop(); // retire le +1
      nextCursor = nextItem!.id;
    }

    return res.status(200).json({
      data: groups,
      nextCursor,
    });
  } catch {
    return res.status(500).json({ error: 'Une erreur est survenue' });
  }
};
