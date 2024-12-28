import React from 'react';
import { Star, Building2 } from 'lucide-react';
import type { CompanyRating } from '../types';

interface Props {
  rating: CompanyRating & {
    user: { full_name: string };
  };
}

const RatingCard: React.FC<Props> = ({ rating }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Building2 className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold">{rating.company_name}</h3>
        </div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < rating.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <p className="text-gray-600 mb-4">{rating.review}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-1">Pros</h4>
          <p className="text-sm text-gray-600">{rating.pros || 'None specified'}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-1">Cons</h4>
          <p className="text-sm text-gray-600">{rating.cons || 'None specified'}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Tenure: {rating.tenure}</span>
        <span>By {rating.user.full_name}</span>
      </div>
    </div>
  );
};

export default RatingCard;