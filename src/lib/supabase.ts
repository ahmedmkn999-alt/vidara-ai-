import { createClient } from '@supabase/supabase-js';

// السيرفر هيقرأ المفاتيح دي من الإعدادات اللي حطيناها في Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
