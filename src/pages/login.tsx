import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './login.module.css';
import Image from 'next/image';

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const handleLogoutShortcut = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.code === 'KeyL') {
        logout();
      }
    };

    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const expirationTime = localStorage.getItem('expirationTime');
    if (isAuthenticated && expirationTime && new Date().getTime() < new Date(expirationTime).getTime()) {
      router.push('/threads');
    } else {
      logout();
    }

    window.addEventListener('keydown', handleLogoutShortcut);

    return () => {
      window.removeEventListener('keydown', handleLogoutShortcut);
    };
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const expirationTime = new Date();
      expirationTime.setHours(expirationTime.getHours() + 2);

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('expirationTime', expirationTime.toISOString());
      router.push('/threads');
    } else {
      setError('Invalid username or password ya dingus');
    }
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('expirationTime');
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles['form-wrapper']}>
        <Image src="/logo.png" alt="Logo" className={styles.logo} width={100} height={100} />
        <form onSubmit={handleLogin}>
          <input
            type="text"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
