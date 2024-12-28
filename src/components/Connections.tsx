import React, { useState } from 'react';
import { supabase } from './supabaseClient';

export const Connections = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    const { data, error } = await supabase.from('users').select('*').ilike('name', `%${search}%`);
    if (error) console.error(error);
    setUsers(data || []);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded"
      />
      <button onClick={fetchUsers} className="p-2 bg-blue-500 text-white rounded">
        Search
      </button>
      <ul>
        {users.map((user: any) => (
          <li key={user.id} className="p-2 border-b">
            {user.name}
            <button className="ml-2 bg-green-500 text-white p-1 rounded">Connect</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
