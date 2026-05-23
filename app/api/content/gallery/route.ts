import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const images = await prisma.frontPageContent.findMany({
      where: { type: 'gallery' }
    });
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}
