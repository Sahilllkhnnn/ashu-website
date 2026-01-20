
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<'loading' | 'authorized' | 'unauthorized'>('loading');

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        // 1. Get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !session) {
          setStatus('unauthorized');
          return;
        }

        // 2. Query the admin_users table by ID
        const { data, error: adminError } = await supabase
          .from('admin_users')
          .select('is_admin')
          .eq('id', session.user.id)
          .single();

        // 3. Validate response
        if (adminError || !data || data.is_admin !== true) {
          console.error("Admin verification failed:", adminError?.message || "User not found in admin_users");
          await supabase.auth.signOut();
          setStatus('unauthorized');
        } else {
          setStatus('authorized');
        }
      } catch (err) {
        console.error("Critical Auth Error:", err);
        setStatus('unauthorized');
      }
    };

    checkAdminStatus();

    // Listen for auth changes (sign outs, etc)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        setStatus('unauthorized');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-2 border-[#C5A059]/10 border-t-[#C5A059] rounded-full animate-spin mb-6"></div>
        <div className="text-center space-y-2">
          <span className="block text-[10px] font-black uppercase tracking-[0.4em] text-[#C5A059]">Authenticating</span>
          <span className="block text-[8px] uppercase tracking-[0.2em] text-white/20">Verifying Royal Credentials</span>
        </div>
      </div>
    );
  }

  if (status === 'unauthorized') {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
