import React from 'react';
import { UserPlus, Users } from 'lucide-react';
import { Connection, User } from '../types';
import { supabase } from '../lib/supabase';

interface Props {
  connections: Connection[];
  onConnect: (userId: string) => void;
}

const NetworkSection: React.FC<Props> = ({ connections, onConnect }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Your Network</h2>
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-blue-600" />
          <span className="text-gray-600">{connections.length} connections</span>
        </div>
      </div>

      <div className="space-y-4">
        {connections.map((connection) => (
          <div
            key={connection.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
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
            
            {connection.status === 'pending' && (
              <div className="flex space-x-2">
                <button
                  onClick={() => onConnect(connection.id)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Accept
                </button>
                <button
                  className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Ignore
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetworkSection;