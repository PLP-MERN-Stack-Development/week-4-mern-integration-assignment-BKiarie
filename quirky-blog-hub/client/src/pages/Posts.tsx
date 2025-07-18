import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBlogApi } from '../hooks/useBlogApi';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  category: { name: string; _id: string } | string;
  image?: string;
  createdAt: string;
}

interface Category {
  _id: string;
  name: string;
}

const POSTS_PER_PAGE = 5;

export default function Posts() {
  const { getPosts, getCategories, loading, error } = useBlogApi();
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    getPosts().then((data) => {
      if (data) setPosts(data);
    });
    getCategories().then((data) => {
      if (data) setCategories(data);
    });
    // eslint-disable-next-line
  }, []);

  // Filter and search logic
  const filtered = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filter ? (typeof post.category === 'string' ? post.category === filter : post.category._id === filter) : true;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };
  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
    setPage(1);
  };
  const handlePage = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div style={{ maxWidth: 800, margin: '32px auto' }}>
      <h1>All Posts</h1>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={handleSearch}
          style={{ flex: 1 }}
        />
        <select value={filter} onChange={handleFilter}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>
      {loading && <div>Loading posts...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && !error && paginated.length === 0 && <div>No posts found.</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {paginated.map((post) => (
          <div key={post._id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, display: 'flex', gap: 16 }}>
            {post.image && (
              <img
                src={post.image.startsWith('http') ? post.image : `/uploads/${post.image}`}
                alt={post.title}
                style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 4 }}
              />
            )}
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: 0 }}>
                <Link to={`/posts/${post._id}`}>{post.title}</Link>
              </h2>
              <div style={{ fontSize: 14, color: '#666' }}>
                By {post.author} | {typeof post.category === 'string' ? post.category : post.category?.name} | {new Date(post.createdAt).toLocaleDateString()}
              </div>
              <p style={{ marginTop: 8 }}>{post.content.slice(0, 120)}{post.content.length > 120 ? '...' : ''}</p>
              <Link to={`/posts/${post._id}`}>Read more</Link>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div style={{ marginTop: 24, display: 'flex', gap: 8, justifyContent: 'center' }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => handlePage(p)}
              disabled={p === page}
              style={{ padding: '4px 12px', borderRadius: 4, border: p === page ? '2px solid #333' : '1px solid #ccc', background: p === page ? '#eee' : '#fff' }}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 