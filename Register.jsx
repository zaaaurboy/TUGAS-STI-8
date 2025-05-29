import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, password });
      setMessage('Registrasi berhasil! Silakan login.');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal');
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: '#000', color: '#f00', padding: '1rem', maxWidth: '300px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>Registrasi</h2>
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
      {message && <p style={{ color: 'lightgreen' }}>{message}</p>}
      {error && <p style={{ color: 'yellow' }}>{error}</p>}
      <button type="submit" style={{ backgroundColor: '#f00', color: '#000', width: '100%', padding: '0.5rem' }}>Register</button>
    </form>
  );
}
