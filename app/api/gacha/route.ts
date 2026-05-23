import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const { discordId } = await request.json();
    
    if (!discordId) {
      return NextResponse.json({ error: "Discord ID is required" }, { status: 400 });
    }

    const stat = await prisma.discordStat.findUnique({
      where: { id: discordId }
    });

    if (!stat) {
      return NextResponse.json({ error: "User not found. Try typing !w2edaily in Discord first." }, { status: 404 });
    }

    if (stat.coins < 200) {
      return NextResponse.json({ error: "Not enough coins! You need 200 coins." }, { status: 400 });
    }

    // Deduct coins
    await prisma.discordStat.update({
      where: { id: discordId },
      data: {
        coins: stat.coins - 200,
        xp: stat.xp + 50 // Gacha gives 50 XP
      }
    });

    const gacha_titles = ['Raja Skip Lagu', 'Penyepong Spotify', 'Pendengar Setia', 'DJ Amatir', 'Sobat Indie', 'Kuli Discord'];
    const won_title = gacha_titles[Math.floor(Math.random() * gacha_titles.length)];

    return NextResponse.json({ success: true, title: won_title, remainingCoins: stat.coins - 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
