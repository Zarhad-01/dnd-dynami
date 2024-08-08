'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      router.push('/threads');
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <main>
      <div>Loading...</div>
    </main>
  );
}