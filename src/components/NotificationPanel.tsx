import React from 'react';
import { Bell } from 'lucide-react';
import { Notification } from '../types';
import { supabase } from '../lib/supabase';

interface Props {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

const NotificationPanel: React.FC<Props> = ({ notifications, onMarkAsRead }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <Bell className="h-5 w-5 text-blue-600" />
      </div>

      <div className="space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 rounded-lg ${
              notification.read ? 'bg-gray-50' : 'bg-blue-50'
            }`}
            onClick={() => !notification.read && onMarkAsRead(notification.id)}
          >
            <p className="text-sm">{notification.content}</p>
            <span className="text-xs text-gray-500">
              {new Date(notification.created_at).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;