import { prisma } from '@/lib/prisma';
import React from 'react';
import { cookies } from 'next/headers';
import AdminClient from './AdminClient';
import AdminLogin from './AdminLogin';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get('admin_token')?.value === 'authorized';
  
  if (!isAdmin) {
    return <AdminLogin />;
  }


  // CMS Data
  const configs = await prisma.config.findMany();

  const contents = await prisma.frontPageContent.findMany();
  const packages = await prisma.sponsorshipPackage.findMany({ orderBy: { order: 'asc' } });

  return (
    <AdminClient 

      configs={configs}
      contents={contents}
      packages={packages}
    />
  );
}
