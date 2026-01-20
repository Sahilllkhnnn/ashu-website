
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Logo from '../Logo';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Immediate redirect if already a verified admin
    const checkExisting = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase.from('admin_users').select('is_admin').eq('id', session.user.id).single();
        if (data?.is_admin) navigate('/admin');
      }
    };
    checkExisting();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // 1. Authenticate with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;

      if (!authData.user) throw new Error("Authentication succeeded but user data is missing.");

      // 2. Verify Admin Status in Database
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('is_admin')
        .eq('id', authData.user.id)
        .single();

      if (adminError || !adminData || adminData.is_admin !== true) {
        await supabase.auth.signOut();
        throw new Error('ACCESS DENIED: NOT AN AUTHORIZED ADMIN');
      }

      // 3. Success
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 obsidian-gradient opacity-60" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#C5A059]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-[#C5A059]/5 blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-panel p-10 md:p-14 rounded-[3.5rem] border-[#C5A059]/15 shadow-3xl text-center bg-black/40 backdrop-blur-3xl">
          <Logo className="h-16 mx-auto mb-10 border-[#C5A059]/30" />
          
          <div className="mb-12">
            <h1 className="text-3xl font-serif text-white mb-2 tracking-wide uppercase">Admin Portal</h1>
            <div className="flex items-center justify-center space-x-2">
              <ShieldCheck size={12} className="text-[#C5A059]/60" />
              <p className="text-[#C5A059]/50 text-[10px] font-bold uppercase tracking-[0.4em]">Secure Orchestration</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2 text-left">
              <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-white/30 ml-4">Credentials</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-[#C5A059]/30" size={16} />
                <input 
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white text-sm focus:outline-none focus:border-[#C5A059]/40 transition-all placeholder:text-white/10"
                  placeholder="admin@azadtent.com"
                />
              </div>
            </div>

            <div className="space-y-2 text-left">
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-[#C5A059]/30" size={16} />
                <input 
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white text-sm focus:outline-none focus:border-[#C5A059]/40 transition-all placeholder:text-white/10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400/80 text-[10px] font-bold uppercase tracking-wider bg-red-400/5 py-4 rounded-xl border border-red-400/10 px-4"
              >
                {error}
              </motion.div>
            )}

            <button
              disabled={loading}
              type="submit"
              className="group w-full py-5 bg-[#C5A059] text-black font-black uppercase tracking-[0.5em] text-[10px] rounded-2xl shadow-2xl transition-all hover:bg-white active:scale-95 flex items-center justify-center disabled:opacity-50"
            >
              {loading ? 'Validating...' : 'Enter Sanctuary'} 
              <ArrowRight size={14} className="ml-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <button 
            onClick={() => navigate('/')}
            className="mt-10 text-[9px] uppercase font-bold tracking-[0.3em] text-white/20 hover:text-[#C5A059] transition-colors"
          >
            Return to Public Site
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
