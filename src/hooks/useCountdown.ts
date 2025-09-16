import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface CountdownData {
  eventName: string;
  targetDate: string;
  scheme: string;
  customBackground?: string;
  customColor?: string;
}

export function useCountdown() {
  const [loading, setLoading] = useState(false);

  // Use useCallback to memoize the functions and prevent infinite re-renders
  const createCountdown = useCallback(async (data: CountdownData) => {
    setLoading(true);
    try {
      const { data: result, error } = await supabase
        .from('countdowns')
        .insert([
          {
            event_name: data.eventName,
            target_date: data.targetDate,
            scheme: data.scheme,
            custom_background: data.customBackground || null,
            custom_color: data.customColor || null,
          }
        ])
        .select()
        .single();

      if (error) {
        // Check for specific Supabase errors
        if (error.message?.includes('JWT') || error.message?.includes('401') || error.message?.includes('Unauthorized')) {
          throw new Error('SUPABASE_AUTH_ERROR');
        }
        throw error;
      }

      return result;
    } catch (error: any) {
      // Only show toast for non-auth errors
      if (error.message !== 'SUPABASE_AUTH_ERROR') {
        console.error('Error creating countdown:', error);
        toast({
          title: "Hiba",
          description: "Nem sikerült létrehozni a visszaszámlálót.",
          variant: "destructive",
        });
      }
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getCountdown = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('countdowns')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        // Check for specific Supabase errors
        if (error.message?.includes('JWT') || error.message?.includes('401') || error.message?.includes('Unauthorized')) {
          throw new Error('SUPABASE_AUTH_ERROR');
        }
        // If Supabase is not available, throw a specific error that can be handled gracefully
        throw new Error('SUPABASE_UNAVAILABLE');
      }

      return data;
    } catch (error: any) {
      // Only show toast for non-Supabase availability/auth errors
      if (error.message !== 'SUPABASE_UNAVAILABLE' && error.message !== 'SUPABASE_AUTH_ERROR') {
        console.error('Error fetching countdown:', error);
        toast({
          title: "Hiba",
          description: "Nem sikerült betölteni a visszaszámlálót.",
          variant: "destructive",
        });
      }
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createCountdown,
    getCountdown,
    loading,
  };
}
