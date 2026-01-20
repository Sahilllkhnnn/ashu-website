
import { createClient } from '@supabase/supabase-js';

/**
 * PRODUCTION ARCHITECTURE NOTE:
 * In Vite-based applications, environment variables are injected into 'import.meta.env' at build time.
 * If running in an environment without Vite transformation (e.g., direct browser ESM),
 * we must safely check for its existence to prevent "Cannot read properties of undefined" errors.
 */

// Safely extract environment variables with fallbacks
const getEnv = () => {
  try {
    // @ts-ignore - Handle environments where import.meta.env might not be defined
    return import.meta.env || {};
  } catch (e) {
    return {};
  }
};

// Fix: Provided a type cast for the environment object to allow access to VITE_ prefixed variables 
// which avoids 'property does not exist' errors on the fallback empty object.
const env = getEnv() as Record<string, string | undefined>;
const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Azad Tent House: Supabase configuration is incomplete.\n" +
    "Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your Vercel Environment Variables.\n" +
    "The application is running with placeholder credentials to prevent a total crash."
  );
}

// createClient requires a valid URL format to initialize without throwing an exception.
// We use a placeholder URL if the environment variable is missing to allow the React application to mount successfully.
const finalUrl = supabaseUrl && supabaseUrl.startsWith('http') 
  ? supabaseUrl 
  : 'https://missing-url.supabase.co';

const finalKey = supabaseAnonKey || 'missing-key';

export const supabase = createClient(finalUrl, finalKey);
