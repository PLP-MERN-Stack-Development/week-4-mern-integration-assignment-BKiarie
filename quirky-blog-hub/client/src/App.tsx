import React, { Suspense, lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Posts = lazy(() => import('./pages/Posts'));
const PostDetail = lazy(() => import('./pages/PostDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));
// Placeholder for Create/Edit, Login, Register
const CreateEditPost = () => <div>Create/Edit Post (TODO)</div>;
const Login = () => <div>Login (TODO)</div>;
const Register = () => <div>Register (TODO)</div>;

export default function App() {
  return (
    <div>
      <nav style={{ padding: 16, borderBottom: '1px solid #eee' }}>
        <Link to="/">Home</Link> |{' '}
        <Link to="/posts">Posts</Link> |{' '}
        <Link to="/create">Create Post</Link> |{' '}
        <Link to="/login">Login</Link> |{' '}
        <Link to="/register">Register</Link>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/create" element={<CreateEditPost />} />
          <Route path="/edit/:id" element={<CreateEditPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
} 