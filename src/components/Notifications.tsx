import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

export const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const userId = supabase.auth.user()?.id;

  const fetchNotifications = async () => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) console.error(error);
    setNotifications(data || []);
  };

  const markAsRead = async (id: string) => {
    const { error } = await supabase.from('notifications').update({ read: true }).eq('id', id);
    if (error) console.error(error);
    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
    const subscription = supabase
      .from(`notifications:user_id=eq.${userId}`)
      .on('INSERT', (payload) => {
        setNotifications((prev) => [payload.new, ...prev]);
      })
      .subscribe();
    return () => supabase.removeSubscription(subscription);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className={`p-2 border-b ${notification.read ? 'bg-gray-100' : 'bg-yellow-100'}`}
          >
            <p>{notification.content}</p>
            {!notification.read && (
              <button
                onClick={() => markAsRead(notification.id)}
                className="text-blue-500 underline"
              >
                Mark as Read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
