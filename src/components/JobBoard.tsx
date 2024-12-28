import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({ title: '', description: '', company: '', location: '' });

  const fetchJobs = async () => {
    const { data, error } = await supabase.from('jobs').select('*');
    if (error) console.error(error);
    setJobs(data || []);
  };

  const postJob = async () => {
    const { error } = await supabase.from('jobs').insert(newJob);
    if (error) console.error(error);
    setNewJob({ title: '', description: '', company: '', location: '' });
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <div className="p-4 bg-white rounded shadow">
        <input
          value={newJob.title}
          onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
          placeholder="Job Title"
          className="p-2 border rounded w-full"
        />
        <textarea
          value={newJob.description}
          onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
          placeholder="Job Description"
          className="p-2 border rounded w-full mt-2"
        />
        <input
          value={newJob.company}
          onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
          placeholder="Company Name"
          className="p-2 border rounded w-full mt-2"
        />
        <input
          value={newJob.location}
          onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
          placeholder="Location"
          className="p-2 border rounded w-full mt-2"
        />
        <button onClick={postJob} className="mt-2 bg-blue-500 text-white p-2 rounded">
          Post Job
        </button>
      </div>
      <ul>
        {jobs.map((job: any) => (
          <li key={job.id} className="p-4 border-b">
            <h2 className="font-bold">{job.title}</h2>
            <p>{job.description}</p>
            <small>{job.company} - {job.location}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};
