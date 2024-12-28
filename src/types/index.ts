export interface User {
  id: string;
  email: string;
  full_name: string;
  current_company?: string;
  years_of_experience: number;
  skills: string[];
  created_at: string;
  headline?: string;
  about?: string;
  location?: string;
  profile_image?: string;
}

export interface Connection {
  id: string;
  requester_id: string;
  receiver_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
  user?: User;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read: boolean;
  created_at: string;
  sender?: User;
  receiver?: User;
}

export interface CompanyPage {
  id: string;
  name: string;
  description?: string;
  industry?: string;
  size?: string;
  website?: string;
  logo_url?: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  content: string;
  read: boolean;
  created_at: string;
}

export interface Endorsement {
  id: string;
  user_id: string;
  endorsed_by_id: string;
  skill: string;
  created_at: string;
  endorsed_by?: User;
}

// ... (keep existing interfaces)