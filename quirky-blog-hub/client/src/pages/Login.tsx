import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { login, loading, error } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const success = await login(form.email, form.password);
    if (success) {
      navigate('/posts');
    } else {
      setFormError('Invalid credentials');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '32px auto' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {formError && <div style={{ color: 'red' }}>{formError}</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
} 