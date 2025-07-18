import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBlogApi } from '../hooks/useBlogApi';

interface Comment {
  author: string;
  text: string;
  createdAt: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  category: { name: string } | string;
  image?: string;
  createdAt: string;
  comments: Comment[];
}

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const { getPost, addComment, loading, error } = useBlogApi();
  const [post, setPost] = useState<Post | null>(null);
  const [comment, setComment] = useState({ author: '', text: '' });
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getPost(id).then((data) => {
        if (data) setPost(data);
      });
    }
    // eslint-disable-next-line
  }, [id]);

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setCommentLoading(true);
    setCommentError(null);
    const res = await addComment(id, comment.author, comment.text);
    if (res) {
      setPost(res);
      setComment({ author: '', text: '' });
    } else {
      setCommentError('Failed to add comment');
    }
    setCommentLoading(false);
  };

  if (loading) return <div>Loading post...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div style={{ maxWidth: 800, margin: '32px auto' }}>
      <h1>{post.title}</h1>
      <div style={{ fontSize: 14, color: '#666' }}>
        By {post.author} | {typeof post.category === 'string' ? post.category : post.category?.name} | {new Date(post.createdAt).toLocaleDateString()}
      </div>
      {post.image && (
        <img
          src={post.image.startsWith('http') ? post.image : `/uploads/${post.image}`}
          alt={post.title}
          style={{ width: '100%', maxWidth: 600, margin: '16px 0', borderRadius: 8 }}
        />
      )}
      <div style={{ margin: '16px 0' }}>{post.content}</div>
      <h3>Comments</h3>
      {post.comments.length === 0 && <div>No comments yet.</div>}
      <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
        {post.comments.map((c, i) => (
          <li key={i} style={{ marginBottom: 12, borderBottom: '1px solid #eee', paddingBottom: 8 }}>
            <strong>{c.author}</strong> <span style={{ color: '#888', fontSize: 12 }}>({new Date(c.createdAt).toLocaleDateString()})</span>
            <div>{c.text}</div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleComment} style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 400 }}>
        <input
          type="text"
          placeholder="Your name"
          value={comment.author}
          onChange={e => setComment({ ...comment, author: e.target.value })}
          required
        />
        <textarea
          placeholder="Add a comment..."
          value={comment.text}
          onChange={e => setComment({ ...comment, text: e.target.value })}
          required
        />
        <button type="submit" disabled={commentLoading}>
          {commentLoading ? 'Adding...' : 'Add Comment'}
        </button>
        {commentError && <div style={{ color: 'red' }}>{commentError}</div>}
      </form>
    </div>
  );
} 