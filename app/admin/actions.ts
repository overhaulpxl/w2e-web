'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateOrderStatus(orderId: string, status: 'SUCCESS' | 'FAILED') {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status }
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error("Failed to update status:", error);
    return { success: false, error: "Gagal update status database" };
  }
}

// --- CMS & CONFIG ACTIONS ---

export async function saveConfigBatch(configs: { key: string, value: string }[]) {
  try {
    // Upsert all configs
    for (const conf of configs) {
      await prisma.config.upsert({
        where: { key: conf.key },
        update: { value: conf.value },
        create: { key: conf.key, value: conf.value }
      });
    }
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}



export async function addFrontPageContent(type: string, value: string, label?: string) {
  try {
    await prisma.frontPageContent.create({ data: { type, value, label } });
    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function deleteFrontPageContent(id: string) {
  try {
    await prisma.frontPageContent.delete({ where: { id } });
    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

// --- SPONSORSHIP PACKAGE ACTIONS ---

export async function saveSponsorshipPackage(id: string | null, data: {
  name: string;
  price: string;
  desc: string;
  accent: string;
  features: string;
  cta: string;
  popular: boolean;
  order: number;
}) {
  try {
    if (id) {
      await prisma.sponsorshipPackage.update({
        where: { id },
        data
      });
    } else {
      await prisma.sponsorshipPackage.create({
        data
      });
    }
    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}



