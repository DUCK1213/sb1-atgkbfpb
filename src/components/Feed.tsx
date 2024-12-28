import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*, users(name, profile_image)')
      .order('created_at', { ascending: false });
    if (error) console.error(error);
    setPosts(data || []);
  };

  const createPost = async () => {
    const { error } = await supabase
      .from('posts')
      .insert({ content: newPost, user_id: supabase.auth.user()?.id });
    if (error) console.error(error);
    setNewPost('');
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="p-4 bg-white rounded shadow">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="What's on your mind?"
        />
        <button onClick={createPost} className="mt-2 bg-blue-500 text-white p-2 rounded">
          Post
        </button>
      </div>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id} className="p-4 border-b">
            <img
              src={post.users.profile_image}
              alt={post.users.name}
              className="w-8 h-8 rounded-full inline-block mr-2"
            />
            <strong>{post.users.name}</strong>
            <p>{post.content}</p>
            <small>{new Date(post.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};
