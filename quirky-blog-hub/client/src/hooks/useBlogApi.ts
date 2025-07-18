import { useState } from 'react';
import api from '../lib/api';

export function useBlogApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/posts');
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch posts');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getPost = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/posts/${id}`);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch post');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (data: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/posts', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create post');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (id: string, data: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.put(`/posts/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update post');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/posts/${id}`);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete post');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/categories');
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch categories');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/categories', { name });
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create category');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (postId: string, author: string, text: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post(`/posts/${postId}/comments`, { author, text });
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add comment');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    getCategories,
    createCategory,
    addComment,
  };
} 