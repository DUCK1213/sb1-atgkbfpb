import React, { useState } from 'react';
import { User } from '../types';
import MessagingPanel from '../components/MessagingPanel';
import { useConnections } from '../hooks/useConnections';

const Messages: React.FC = () => {
  const { connections } = useConnections();
  const [selectedUser, setSelectedUser] = useState<User>();
  const [currentUser, setCurrentUser] = useState<User>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Contacts List */}
      <div className="md:col-span-1 bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Contacts</h2>
        <div className="space-y-2">
          {connections
            .filter(c => c.status === 'accepted')
            .map(connection => (
              <div
                key={connection.id}
                onClick={() => setSelectedUser(connection.user)}
                className={`p-3 rounded-lg cursor-pointer hover:bg-gray-50 ${
                  selectedUser?.id === connection.user?.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={connection.user?.profile_image || 'https://via.placeholder.com/40'}
                    alt={connection.user?.full_name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{connection.user?.full_name}</h3>
                    <p className="text-sm text-gray-500">{connection.user?.headline}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Chat Panel */}
      <div className="md:col-span-3">
        {currentUser && (
          <MessagingPanel
            currentUser={currentUser}
            selectedUser={selectedUser}
          />
        )}
      </div>
    </div>
  );
};

export default Messages;