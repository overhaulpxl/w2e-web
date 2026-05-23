import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const packages = await prisma.package.findMany({ orderBy: { amount: 'asc' } });
    const configs = await prisma.config.findMany({
      where: { key: { in: ['rate5days', 'rategamepass'] } }
    });

    const configMap: Record<string, string> = {};
    configs.forEach(c => configMap[c.key] = c.value);

    return NextResponse.json({
      success: true,
      data: {
        packages,
        rate5days: Number(configMap['rate5days']) || 144,
        rategamepass: Number(configMap['rategamepass']) || 155
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
