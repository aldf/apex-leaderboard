import prisma from "@/app/libs/prismadb";

export interface ILeadersBoardsParams {
  userId?: string;
  setting?: string;
}

export default async function getLeadersBoards(setting: string) {
  try {
    let query: any = {};
    var leadersBoardRank;
    if (setting === "Max") {
      leadersBoardRank = await prisma.points.groupBy({
        where: query,
        by: ["userId"],
        _max: {
          points: true,
        },
        orderBy: {
          _max: {
            points: "desc",
          },
        },
      });
    } else if (setting === "Min") {
      leadersBoardRank = await prisma.points.groupBy({
        where: query,
        by: ["userId"],
        _min: {
          points: true,
        },
        orderBy: {
          _min: {
            points: "asc",
          },
        },
      });
    } else {
      leadersBoardRank = await prisma.points.groupBy({
        where: query,
        by: ["userId"],
        _sum: {
          points: true,
        },
        orderBy: {
          _sum: {
            points: "desc",
          },
        },
      });
    }
    const leadersBoard = await prisma.points.findMany({
      where: {
        userId: {
          in: leadersBoardRank.map((item: any) => item.userId),
        },
      },
      include: {
        user: true,
      },
      orderBy: {
        points: "desc",
      },
    });

    // map to get the user name
    const safePoints = leadersBoardRank.map((leader: any) => {
      const user = leadersBoard.find(
        (item: any) => item.userId === leader.userId
      );
      return {
        ...leader,
        user: user?.user,
        createdAt: user?.createdAt.toISOString(),
        points:
          setting === "Max"
            ? leader._max.points
            : setting === "Min"
            ? leader._min.points
            : leader._sum.points,
      };
    });

    return safePoints;
  } catch (error: any) {
    throw new Error(error);
  }
}
