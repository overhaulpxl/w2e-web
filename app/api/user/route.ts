import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get('uid');

  if (!uid) {
    return NextResponse.json({ error: 'UID is required' }, { status: 400 });
  }

  const botToken = process.env.DISCORD_BOT_TOKEN;

  if (!botToken) {
    // Return a specific error code so the frontend knows the token is missing
    return NextResponse.json({ error: 'MISSING_TOKEN' }, { status: 500 });
  }

  try {
    const res = await fetch(`https://discord.com/api/v10/users/${uid}`, {
      headers: {
        Authorization: `Bot ${botToken}`
      },
      // Cache this for 1 hour so we don't spam the Discord API
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      throw new Error(`Discord API responded with ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching Discord user:", error);
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}
