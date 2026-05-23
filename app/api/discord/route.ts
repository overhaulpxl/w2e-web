import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(`https://discord.com/api/v9/invites/way2eternal?with_counts=true`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Fetch failed");
    const data = await res.json();
    
    return NextResponse.json({
      members: data.approximate_member_count || 34000,
      msgs: 500, // mock
      engagement: 99 // mock
    });
  } catch (e) {
    return NextResponse.json({ members: 34000, msgs: 500, engagement: 99 });
  }
}
