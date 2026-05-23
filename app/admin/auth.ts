'use server';

import { cookies } from 'next/headers';

export async function adminLoginAction(email: string, password: string) {
  if (email === 'blur@w2e.eth' && password === 'blurred') {
    // Set a secure cookie that expires in 7 days
    const cookieStore = await cookies();
    cookieStore.set('admin_token', 'authorized', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });
    return { success: true };
  } else {
    return { success: false, error: 'Email atau password salah!' };
  }
}

export async function adminLogoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_token');
}
