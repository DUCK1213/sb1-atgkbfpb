import React, { useState, useEffect } from 'react';
import { BriefcaseIcon, Building2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { JobPost, User } from '../types';

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [userProfile, setUserProfile] = useState<User | null>(null);

  useEffect(() => {
    loadJobs();
    loadUserProfile();
  }, []);

  const loadJobs = async () => {
    const { data, error } = await supabase
      .from('job_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setJobs(data);
    }
  };

  const loadUserProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (data) {
        setUserProfile(data);
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Job Opportunities</h1>
      
      {userProfile && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Matched Based on Your Skills</h2>
          <p className="text-sm text-blue-600">
            Jobs are intelligently matched to your profile based on your skills and experience level.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                <div className="flex items-center space-x-2 text-gray-500">
                  <Building2 className="h-4 w-4" />
                  <span>{job.company}</span>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {job.experience_level}
              </span>
            </div>

            <p className="text-gray-600 mb-4">{job.description}</p>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {job.required_skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">{job.location}</span>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;