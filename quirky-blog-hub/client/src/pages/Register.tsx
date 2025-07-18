import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
  const { register, loading, error } = useAuth();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!form.username || !form.email || !form.password) {
      setFormError('All fields are required');
      return;
    }
    const success = await register(form.username, form.email, form.password);
    if (success) {
      navigate('/login');
    } else {
      setFormError('Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '32px auto' }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
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
          {loading ? 'Registering...' : 'Register'}
        </button>
        {formError && <div style={{ color: 'red' }}>{formError}</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
} 