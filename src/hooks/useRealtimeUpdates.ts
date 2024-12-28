import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useRealtimeUpdates(
  table: string,
  callback: (payload: any) => void,
  filter?: { event: string; schema: string }
) {
  useEffect(() => {
    const channel = supabase
      .channel('db-changes')
      .on(
        'postgres_changes',
        {
          event: filter?.event || '*',
          schema: filter?.schema || 'public',
          table: table
        },
        callback
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, callback, filter]);
}