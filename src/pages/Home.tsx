import React, { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, Share2 } from 'lucide-react';
import { Post } from '../types';
import { supabase } from '../lib/supabase';
import NotificationPanel from '../components/NotificationPanel';
import { useNotifications } from '../hooks/useNotifications';

const Home: React.FC = () => {
  const [newPost, setNewPost] = useState('');
  const { notifications, markAsRead } = useNotifications();
  const maxChars = 500;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('posts')
      .insert([{
        user_id: user.id,
        content: newPost.trim()
      }]);

    if (!error) {
      setNewPost('');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Main Feed */}
      <div className="md:col-span-2 space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          {/* ... (keep existing post form) */}
        </div>

        <div className="space-y-4">
          {/* ... (keep existing posts section) */}
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <NotificationPanel
          notifications={notifications}
          onMarkAsRead={markAsRead}
        />
      </div>
    </div>
  );
};

export default Home;