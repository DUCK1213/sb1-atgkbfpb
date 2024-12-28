import { useState, useEffect } from 'react';
import { Connection } from '../types';
import { supabase } from '../lib/supabase';

export function useConnections() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConnections();
  }, []);

  const loadConnections = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('connections')
      .select('*, user:users!receiver_id(*)')
      .or(`requester_id.eq.${user.id},receiver_id.eq.${user.id}`)
      .order('created_at', { ascending: false });

    if (data) {
      setConnections(data);
    }
    setLoading(false);
  };

  const handleConnection = async (userId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('connections')
      .update({ status: 'accepted' })
      .eq('id', userId);

    if (!error) {
      loadConnections();
    }
  };

  return { connections, loading, handleConnection };
}