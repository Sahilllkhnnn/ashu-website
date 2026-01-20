// Fix: Removed problematic triple-slash reference to 'vite/client' which was causing a 'type definition not found' error.
// Instead, we manually define the ImportMeta and ImportMetaEnv interfaces to ensure the application's 
// environment variables (like VITE_SUPABASE_URL) remain correctly typed and accessible via import.meta.env.

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly [key: string]: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
