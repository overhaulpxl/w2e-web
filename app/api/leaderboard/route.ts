import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      where: { status: 'SUCCESS' },
      include: { user: true }
    });

    const userStats = new Map<string, {
      userId: string;
      name: string;
      image: string | null;
      totalRp: number;
      totalRobux: number;
    }>();

    for (const order of orders) {
      if (!order.userId) continue;

      const stats = userStats.get(order.userId) || {
        userId: order.userId,
        name: order.user?.name || order.robloxUser || 'Unknown',
        image: order.user?.image || null,
        totalRp: 0,
        totalRobux: 0,
      };

      stats.totalRp += order.amount;

      // Extract robux amount from package string (e.g., "500 R$ - gamepass")
      const robuxMatch = order.package.match(/^(\d+)/);
      if (robuxMatch && robuxMatch[1]) {
        stats.totalRobux += parseInt(robuxMatch[1], 10);
      }

      userStats.set(order.userId, stats);
    }

    const leaderboard = Array.from(userStats.values())
      .sort((a, b) => b.totalRp - a.totalRp)
      .slice(0, 10);

    return NextResponse.json({ success: true, data: leaderboard });
  } catch (error) {
    console.error("Leaderboard Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch leaderboard" }, { status: 500 });
  }
}
