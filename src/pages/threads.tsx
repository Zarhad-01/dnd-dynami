import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Thread = {
  id: number;
  title: string;
  createdAt: string;
};

const ThreadsPage = () => {
  const router = useRouter();
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    const handleLogoutShortcut = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.code === 'KeyL') {
        logout();
      }
    };

    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const expirationTime = localStorage.getItem('expirationTime');
    if (!isAuthenticated || (expirationTime && new Date().getTime() >= new Date(expirationTime).getTime())) {
      logout();
    } else {
      // Fetch threads data (for now we will use hardcoded data)
      const fetchedThreads: Thread[] = [
        { id: 1, title: 'First Thread', createdAt: '2023-01-01T12:00:00Z' },
        { id: 2, title: 'Second Thread', createdAt: '2023-02-01T12:00:00Z' },
        { id: 3, title: 'Third Thread', createdAt: '2023-03-01T12:00:00Z' },
      ];

      // Sort threads by creation datetime
      fetchedThreads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      setThreads(fetchedThreads);
    }

    window.addEventListener('keydown', handleLogoutShortcut);

    return () => {
      window.removeEventListener('keydown', handleLogoutShortcut);
    };
  }, [router]);

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('expirationTime');
    router.push('/login');
  };

  return (
    <div>
      <h1>Threads</h1>
      <ul>
        {threads.map((thread) => (
          <li key={thread.id}>
            <h2>{thread.title}</h2>
            <p>Created at: {new Date(thread.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadsPage;
