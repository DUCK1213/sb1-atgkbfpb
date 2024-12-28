import React from 'react';
import { ThumbsUp } from 'lucide-react';
import { Endorsement } from '../types';
import { supabase } from '../lib/supabase';

interface Props {
  endorsements: Endorsement[];
  onEndorse: (skill: string) => void;
}

const EndorsementSection: React.FC<Props> = ({ endorsements, onEndorse }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Skill Endorsements</h2>

      <div className="space-y-4">
        {endorsements.map((endorsement) => (
          <div key={endorsement.id} className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{endorsement.skill}</h3>
              <p className="text-sm text-gray-500">
                Endorsed by {endorsement.endorsed_by?.full_name}
              </p>
            </div>
            <ThumbsUp className="h-5 w-5 text-blue-600" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EndorsementSection;