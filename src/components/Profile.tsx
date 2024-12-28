import React from 'react';

export const Profile = ({ user }: { user: any }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <img src={user.profile_image} alt={user.name} className="rounded-full w-16 h-16" />
      <h2 className="text-xl font-bold">{user.name}</h2>
      <p>{user.bio}</p>
      <ul>
        {user.skills.map((skill: string) => (
          <li key={skill} className="inline-block bg-blue-100 text-blue-700 p-1 rounded m-1">
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};
