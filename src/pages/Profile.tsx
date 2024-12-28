import React, { useState, useEffect } from 'react';
import { UserIcon, Plus, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { User, Endorsement } from '../types';
import EndorsementSection from '../components/EndorsementSection';
import NetworkSection from '../components/NetworkSection';
import { useConnections } from '../hooks/useConnections';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [endorsements, setEndorsements] = useState<Endorsement[]>([]);
  const { connections, handleConnection } = useConnections();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    current_company: '',
    years_of_experience: 0,
    headline: '',
    about: '',
    location: ''
  });

  // ... (keep existing loadProfile function)

  const handleEndorse = async (skill: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !profile) return;

    const { error } = await supabase
      .from('endorsements')
      .insert([{
        user_id: profile.id,
        endorsed_by_id: user.id,
        skill
      }]);

    if (!error) {
      loadProfile();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow p-6">
        {/* ... (keep existing profile section) */}
      </div>

      {/* Network Section */}
      <NetworkSection 
        connections={connections}
        onConnect={handleConnection}
      />

      {/* Skills and Endorsements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          {/* ... (keep existing skills section) */}
        </div>
        <EndorsementSection
          endorsements={endorsements}
          onEndorse={handleEndorse}
        />
      </div>
    </div>
  );
};

export default Profile;