import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      login(res.data.token, res.data.user);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: '#000', color: '#f00', padding: '1rem', maxWidth: '300px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', border: '1px solid #f00', backgroundColor: '#111', color: '#fff' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', border: '1px solid #f00', backgroundColor: '#111', color: '#fff' }}
      />
      {error && <p style={{ color: 'yellow' }}>{error}</p>}
      <button type="submit" style={{ backgroundColor: '#f00', color: '#000', width: '100%', padding: '0.5rem' }}>Login</button>
    </form>
  );
}
