
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Eye, EyeOff, Upload, X, AlignLeft } from 'lucide-react';
import { getPortfolioItems, createPortfolioItem, updatePortfolioItem, deletePortfolioItem, uploadPortfolioImage } from '../../lib/api';

const PortfolioManager: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Weddings',
    description: '',
    image: null as File | null,
    imagePreview: ''
  });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getPortfolioItems(true);
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ 
        ...formData, 
        image: file, 
        imagePreview: URL.createObjectURL(file) 
      });
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) return alert('Please select an image for this royal showcase.');
    
    setUploading(true);
    try {
      const imageUrl = await uploadPortfolioImage(formData.image);
      await createPortfolioItem({
        title: formData.title,
        category: formData.category,
        description: formData.description,
        image_url: imageUrl
      });
      setIsModalOpen(false);
      setFormData({ title: '', category: 'Weddings', description: '', image: null, imagePreview: '' });
      fetchItems();
    } catch (err: any) {
      alert(`Upload failed: ${err.message || 'Check RLS policies and storage bucket settings.'}`);
    } finally {
      setUploading(false);
    }
  };

  const toggleStatus = async (id: string, current: boolean) => {
    try {
      await updatePortfolioItem(id, { is_active: !current });
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm('Are you sure you want to delete this royal showcase?')) return;
    try {
      await deletePortfolioItem(id, imageUrl);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex justify-end mb-8">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#C5A059] text-black px-8 py-4 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white transition-all flex items-center shadow-xl"
        >
          <Plus size={16} className="mr-3" /> Add Showcase
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => <div key={i} className="h-[300px] glass-panel rounded-3xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className="glass-panel rounded-3xl overflow-hidden flex flex-col group border-white/5">
              <div className="relative aspect-video">
                <img src={item.image_url} alt="" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button 
                    onClick={() => toggleStatus(item.id, item.is_active)}
                    className={`p-2 rounded-xl backdrop-blur-xl border border-white/10 ${item.is_active ? 'text-green-400 bg-green-400/10' : 'text-gray-400 bg-gray-400/10'}`}
                  >
                    {item.is_active ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id, item.image_url)}
                    className="p-2 rounded-xl backdrop-blur-xl border border-white/10 text-red-400 bg-red-400/10 hover:bg-red-400 hover:text-white transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <span className="text-[#C5A059] text-[8px] font-black uppercase tracking-[0.3em] mb-2 block">{item.category}</span>
                <h4 className="text-white font-serif text-xl tracking-wide">{item.title}</h4>
                {item.description && (
                  <p className="text-white/30 text-[10px] mt-2 line-clamp-2 italic leading-relaxed">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-3xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel w-full max-w-2xl rounded-[3rem] p-10 md:p-14 relative border-[#C5A059]/20 bg-[#0a0a0b] max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-white/20 hover:text-white"><X /></button>
            <h3 className="text-3xl font-serif text-white mb-8">New Gallery Item</h3>
            
            <form onSubmit={handleCreate} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-white/30 ml-2">Showcase Title</label>
                  <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-[#C5A059]/50 transition-all" placeholder="e.g. Royal Rajput Wedding" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-white/30 ml-2">Category</label>
                  <div className="relative">
                    <select 
                      value={formData.category} 
                      onChange={e => setFormData({...formData, category: e.target.value})} 
                      className="w-full bg-[#0a0a0b] border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-[#C5A059]/50 appearance-none [color-scheme:dark]"
                    >
                      <option className="bg-[#0a0a0b] text-white" value="Weddings">Weddings</option>
                      <option className="bg-[#0a0a0b] text-white" value="Corporate">Corporate</option>
                      <option className="bg-[#0a0a0b] text-white" value="Parties">Parties</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-white/30 ml-2">Artistic Description</label>
                <div className="relative">
                  <textarea 
                    rows={3}
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})} 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-[#C5A059]/50 transition-all resize-none" 
                    placeholder="Describe the royal essence of this event..."
                  />
                  <AlignLeft className="absolute right-6 top-4 text-white/10" size={16} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-white/30 ml-2">Showcase Media</label>
                <div className="relative group cursor-pointer border-2 border-dashed border-white/10 rounded-[2rem] h-48 flex flex-col items-center justify-center bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#C5A059]/30 transition-all overflow-hidden">
                  {formData.imagePreview ? (
                    <img src={formData.imagePreview} className="absolute inset-0 w-full h-full object-cover opacity-40" />
                  ) : (
                    <Upload className="text-[#C5A059]/30 mb-4 group-hover:scale-110 transition-transform" size={32} />
                  )}
                  <span className="relative z-10 text-[9px] font-bold uppercase tracking-widest text-white/40">{formData.imagePreview ? 'Replace Image' : 'Click to Upload High-Res Photograph'}</span>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>

              <button 
                disabled={uploading}
                type="submit" 
                className="w-full py-5 bg-[#C5A059] text-black font-black uppercase tracking-[0.4em] text-[10px] rounded-2xl shadow-2xl transition-all hover:bg-white disabled:opacity-50"
              >
                {uploading ? 'Processing & Uploading...' : 'Add to Collection'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default PortfolioManager;
