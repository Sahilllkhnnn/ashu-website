import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2, Star, Clock, Filter } from 'lucide-react';
import { getAllReviews, approveReview, deleteReview } from '../../lib/api';

const ReviewsManager: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('pending');
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await getAllReviews();
      setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await approveReview(id);
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Discard this feedback?')) return;
    try {
      await deleteReview(id);
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = reviews.filter(r => {
    if (filter === 'pending') return !r.is_approved;
    if (filter === 'approved') return r.is_approved;
    return true;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
          {['pending', 'approved', 'all'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-6 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${
                filter === f ? 'bg-[#C5A059] text-black shadow-lg' : 'text-white/40 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <p className="text-white/20 text-[9px] font-bold uppercase tracking-widest">{filtered.length} Reviews Found</p>
      </div>

      <div className="space-y-6">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="h-32 glass-panel rounded-3xl animate-pulse" />)
        ) : filtered.length === 0 ? (
          <div className="glass-panel p-20 rounded-[3rem] text-center border-white/5 opacity-30">
            <Filter size={32} className="mx-auto mb-4" />
            <p className="text-[10px] font-bold uppercase tracking-widest">No matching reviews found</p>
          </div>
        ) : (
          filtered.map((review) => (
            <div key={review.id} className="glass-panel p-8 rounded-[2.5rem] border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-[#C5A059]/20 transition-all">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex text-[#C5A059]">
                    {Array.from({ length: review.rating }).map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                  <span className="text-white/20 text-[8px] font-bold uppercase tracking-widest flex items-center">
                    <Clock size={10} className="mr-1.5" /> {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-white font-bold tracking-[0.1em] text-sm uppercase mb-2">{review.name} <span className="text-white/20 font-light mx-2">•</span> <span className="text-[#C5A059]/60">{review.event_type}</span></h4>
                <p className="text-white/40 text-xs italic leading-relaxed">"{review.message}"</p>
              </div>

              <div className="flex space-x-3 w-full md:w-auto">
                {!review.is_approved && (
                  <button 
                    onClick={() => handleApprove(review.id)}
                    className="flex-1 md:flex-none flex items-center justify-center px-6 py-3 rounded-xl bg-green-400/10 text-green-400 border border-green-400/20 hover:bg-green-400 hover:text-white transition-all text-[9px] font-bold uppercase tracking-widest"
                  >
                    <Check size={14} className="mr-2" /> Approve
                  </button>
                )}
                <button 
                  onClick={() => handleDelete(review.id)}
                  className="flex-1 md:flex-none flex items-center justify-center px-6 py-3 rounded-xl bg-red-400/10 text-red-400 border border-red-400/20 hover:bg-red-400 hover:text-white transition-all text-[9px] font-bold uppercase tracking-widest"
                >
                  <Trash2 size={14} className="mr-2" /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default ReviewsManager;