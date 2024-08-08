// src/pages/login.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // HAHAHA FUCK YOU, DON'T YOU TRY ME MOTHERFUCKER
    const hardcodedUsername = process.env.NEXT_PUBLIC_USERNAME;
    const hardcodedPassword = process.env.NEXT_PUBLIC_PASSWORD;

    if (username === hardcodedUsername && password === hardcodedPassword) {
      router.push('/threads');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
