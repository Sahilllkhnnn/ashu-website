import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar, Trash2, Tag } from 'lucide-react';
import { getEnquiries, deleteEnquiry } from '../../lib/api';

const EnquiriesManager: React.FC = () => {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const data = await getEnquiries();
      setEnquiries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Mark this lead as processed and delete?')) return;
    try {
      await deleteEnquiry(id);
      fetchEnquiries();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="space-y-8">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="h-48 glass-panel rounded-3xl animate-pulse" />)
        ) : enquiries.length === 0 ? (
          <div className="glass-panel p-20 rounded-[3rem] text-center border-white/5 opacity-30">
            <Mail size={32} className="mx-auto mb-4" />
            <p className="text-[10px] font-bold uppercase tracking-widest">No active enquiries in the sanctuary</p>
          </div>
        ) : (
          enquiries.map((eq) => (
            <div key={eq.id} className="glass-panel p-10 rounded-[3rem] border-white/5 flex flex-col lg:flex-row gap-10 hover:border-[#C5A059]/30 transition-all group shadow-2xl">
              <div className="flex-1 space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-2xl font-serif text-white tracking-wide">{eq.name}</h4>
                    <p className="text-[#C5A059] text-[9px] font-black uppercase tracking-[0.3em] mt-1">Submitted on {new Date(eq.created_at).toLocaleDateString()}</p>
                  </div>
                  {eq.service && (
                    <div className="flex items-center space-x-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/5">
                      <Tag size={12} className="text-[#C5A059]" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">{eq.service}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-[#C5A059]/5 flex items-center justify-center text-[#C5A059] border border-[#C5A059]/10">
                      <Phone size={14} />
                    </div>
                    <div>
                      <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest mb-1">WhatsApp / Phone</p>
                      <a href={`tel:${eq.phone}`} className="text-xs text-white/80 hover:text-[#C5A059] transition-colors">{eq.phone}</a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-[#C5A059]/5 flex items-center justify-center text-[#C5A059] border border-[#C5A059]/10">
                      <Calendar size={14} />
                    </div>
                    <div>
                      <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest mb-1">Event Date</p>
                      <p className="text-xs text-white/80">{eq.event_date}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-[#C5A059]/5 flex items-center justify-center text-[#C5A059] border border-[#C5A059]/10">
                      <MapPin size={14} />
                    </div>
                    <div>
                      <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest mb-1">Event Location</p>
                      <p className="text-xs text-white/80">{eq.city}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 italic text-white/40 text-sm leading-relaxed">
                  "{eq.message}"
                </div>
              </div>

              <div className="flex lg:flex-col justify-end gap-4 border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-10">
                <a 
                  href={`https://wa.me/${eq.phone.replace(/[^0-9]/g, '')}`} 
                  target="_blank"
                  className="flex-1 lg:flex-none px-8 py-4 bg-[#C5A059] text-black rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-white transition-all flex items-center justify-center shadow-xl"
                >
                  WhatsApp Reply
                </a>
                <button 
                  onClick={() => handleDelete(eq.id)}
                  className="flex-1 lg:flex-none p-4 bg-red-400/10 text-red-400 border border-red-400/20 rounded-xl hover:bg-red-400 hover:text-white transition-all flex items-center justify-center shadow-xl"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default EnquiriesManager;