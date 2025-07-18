import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBlogApi } from '../hooks/useBlogApi';
import { useAuth } from '../hooks/useAuth';

interface Category {
  _id: string;
  name: string;
}

export default function CreateEditPost() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getPost, createPost, updatePost, getCategories, loading, error } = useBlogApi();
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({
    title: '',
    content: '',
    category: '',
    image: null as File | null,
  });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getCategories().then((data) => {
      if (data) setCategories(data);
    });
    if (isEdit && id) {
      getPost(id).then((data) => {
        if (data) setForm({
          title: data.title,
          content: data.content,
          category: typeof data.category === 'string' ? data.category : data.category?._id,
          image: null,
        });
      });
    }
    // eslint-disable-next-line
  }, [id]);

  if (!user) {
    return <div style={{ color: 'red' }}>You must be logged in to {isEdit ? 'edit' : 'create'} a post.</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as any;
    if (name === 'image') {
      setForm((f) => ({ ...f, image: files[0] }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitError(null);
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('content', form.content);
    formData.append('category', form.category);
    formData.append('author', user.username);
    if (form.image) formData.append('image', form.image);
    let res;
    if (isEdit && id) {
      res = await updatePost(id, formData);
    } else {
      res = await createPost(formData);
    }
    if (res && res._id) {
      navigate(`/posts/${res._id}`);
    } else {
      setSubmitError('Failed to submit post');
    }
    setSubmitLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '32px auto' }}>
      <h1>{isEdit ? 'Edit' : 'Create'} Post</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          required
          rows={8}
        />
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        <input
          type="file"
          name="image"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleChange}
        />
        <button type="submit" disabled={submitLoading}>
          {submitLoading ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update Post' : 'Create Post')}
        </button>
        {submitError && <div style={{ color: 'red' }}>{submitError}</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
} 