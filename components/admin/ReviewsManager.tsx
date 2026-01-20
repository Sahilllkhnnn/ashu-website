
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Star, Clock, Inbox } from 'lucide-react';
import { getAllReviews, deleteReview } from '../../lib/api';

const ReviewsManager: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
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

  const handleDelete = async (id: string) => {
    if (!confirm('Discard this feedback? This action is permanent.')) return;
    try {
      await deleteReview(id);
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C5A059]">Moderation Suite</h3>
          <p className="text-white/20 text-[9px] font-bold uppercase tracking-widest mt-1">Live Feed Orchestration</p>
        </div>
        <div className="px-6 py-3 rounded-full bg-white/5 border border-white/5">
           <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">{reviews.length} Total Testimonials</p>
        </div>
      </div>

      <div className="space-y-6">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="h-32 glass-panel rounded-3xl animate-pulse" />)
        ) : reviews.length === 0 ? (
          <div className="glass-panel p-20 rounded-[3rem] text-center border-white/5 opacity-30">
            <Inbox size={32} className="mx-auto mb-4" />
            <p className="text-[10px] font-bold uppercase tracking-widest">The feed is currently silent</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="glass-panel p-8 rounded-[2.5rem] border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-red-400/20 transition-all">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex text-[#C5A059]">
                    {Array.from({ length: review.rating }).map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                  <span className="text-white/20 text-[8px] font-bold uppercase tracking-widest flex items-center">
                    <Clock size={10} className="mr-1.5" /> {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-white font-bold tracking-[0.1em] text-sm uppercase mb-2">
                  {review.name} 
                  <span className="text-white/20 font-light mx-2">•</span> 
                  <span className="text-[#C5A059]/60">{review.event_type}</span>
                </h4>
                <p className="text-white/40 text-xs italic leading-relaxed">"{review.message}"</p>
              </div>

              <div className="w-full md:w-auto">
                <button 
                  onClick={() => handleDelete(review.id)}
                  className="w-full md:w-auto flex items-center justify-center px-8 py-4 rounded-xl bg-red-400/5 text-red-400/50 border border-red-400/10 hover:bg-red-400 hover:text-white hover:border-red-400 transition-all text-[9px] font-black uppercase tracking-widest"
                >
                  <Trash2 size={14} className="mr-3" /> Remove Record
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
