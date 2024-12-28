import React, { useState, useEffect } from 'react';
import { Star, Building2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { CompanyRating } from '../types';
import CompanyRatingForm from '../components/CompanyRatingForm';
import RatingCard from '../components/RatingCard';

const Companies: React.FC = () => {
  const [ratings, setRatings] = useState<CompanyRating[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadRatings();
  }, []);

  const loadRatings = async () => {
    const { data, error } = await supabase
      .from('company_ratings')
      .select('*, user:users(full_name)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setRatings(data);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Company Reviews</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Review
        </button>
      </div>

      {showForm && (
        <CompanyRatingForm
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            loadRatings();
          }}
        />
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {ratings.map((rating) => (
          <RatingCard key={rating.id} rating={rating} />
        ))}
      </div>
    </div>
  );
};

export default Companies;