import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bnlrmeniwyedpoxtbpri.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJubHJtZW5pd3llZHBveHRicHJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4OTUwNzAsImV4cCI6MjA4NDQ3MTA3MH0.awC3YPl1DUycRc8V_A45CHDpQ4OtJccppDiFXlU-EBw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);