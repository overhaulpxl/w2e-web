import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ endpoint: string }> }) {
  const { endpoint } = await params;
  const url = `${process.env.BOT_API_URL || 'http://localhost:8081'}/api/${endpoint}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to connect to bot' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ endpoint: string }> }) {
  const { endpoint } = await params;
  const url = `${process.env.BOT_API_URL || 'http://localhost:8081'}/api/${endpoint}`;
  try {
    const body = await req.json();
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to connect to bot' }, { status: 500 });
  }
}
