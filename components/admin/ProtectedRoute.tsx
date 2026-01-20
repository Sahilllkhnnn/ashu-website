
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

// HARDCODED ADMIN WHITELIST
// Update these emails to your authorized admin accounts
const ADMIN_EMAILS = [
  'admin@azadtent.com', 
  'azadtenthouse@gmail.com',
  'chandia.azad@gmail.com'
];

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user?.email && ADMIN_EMAILS.includes(session.user.email)) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.email && ADMIN_EMAILS.includes(session.user.email)) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-2 border-[#C5A059]/10 border-t-[#C5A059] rounded-full animate-spin mb-4"></div>
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C5A059]/40">Securing Sanctuary...</span>
      </div>
    );
  }

  if (!isAuthorized) {
    // If authenticated but not admin, sign out and redirect
    supabase.auth.signOut();
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
