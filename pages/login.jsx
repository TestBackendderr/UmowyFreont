import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Logowanie do CRM</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Wprowadź email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Hasło</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Wprowadź hasło"
            />
          </div>
          <button type="submit" className="login-btn">Zaloguj się</button>
        </form>
      </div>
    </div>
  );
};

export default Login;