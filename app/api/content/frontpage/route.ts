import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const contents = await prisma.frontPageContent.findMany();
    const configs = await prisma.config.findMany({
      where: { key: { in: ['whatsapp', 'instagram'] } }
    });

    const configMap: Record<string, string> = {};
    configs.forEach(c => configMap[c.key] = c.value);

    return NextResponse.json({
      success: true,
      data: {
        contents,
        contact: {
          whatsapp: configMap['whatsapp'] || '',
          instagram: configMap['instagram'] || ''
        }
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
