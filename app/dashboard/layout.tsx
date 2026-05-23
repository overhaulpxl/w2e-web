import { cookies } from 'next/headers';
import AdminLogin from '@/app/admin/AdminLogin';
import ClientLayout from './ClientLayout';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get('admin_token')?.value === 'authorized';
  
  if (!isAdmin) {
    return <AdminLogin />;
  }
  
  return <ClientLayout>{children}</ClientLayout>;
}
