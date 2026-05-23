import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const videos = await prisma.frontPageContent.findMany({
      where: { type: 'tiktok' }
    });
    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}
