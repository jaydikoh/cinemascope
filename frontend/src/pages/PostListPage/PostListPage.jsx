import { useState, useEffect } from 'react';
import * as postService from '../../services/postService';
import './PostListPage.css';
import PostItem from '../../components/PostItem/PostItem';

export default function PostListPage() {
  const [posts, setPosts] = useState([
    {
      content: 'Hello there from Kate',
      createdAt: '2025-01-22T08:35:22',
      _id: 'agf4urfi',
      user: {
        name: 'Kate',
        email: 'kate@email.com',
        _id: 'a45fb15',
      },
    },
    {
      content: 'Hello there from Justin',
      createdAt: '2025-01-21T06:35:22',
      _id: 'agf4urf8',
      user: {
        name: 'Justin',
        email: 'justin@email.com',
        _id: 'a45fb16',
      },
    },
  ]);

  useEffect(() => {
    async function fetchPosts() {
      const posts = await postService.index();
      setPosts(posts);
    }
    fetchPosts();
  }, []);

  const postItems = posts.map((p) => <PostItem key={p._id} post={p} />);

  return (
    <>
      <h1>Post List</h1>
      <section className="post-item-container">{postItems}</section>
    </>
  );
}
