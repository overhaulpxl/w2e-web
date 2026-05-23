import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { name, rating, comment } = body;

    if (!name || !rating || !comment) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        userId: session?.user ? (session.user as any).id : null,
        name,
        rating: Number(rating),
        comment,
        approved: false // Requires admin approval to be shown on the homepage
      }
    });

    return NextResponse.json({ success: true, data: review });
  } catch (error) {
    console.error("Review creation error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      where: { approved: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, data: reviews });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
