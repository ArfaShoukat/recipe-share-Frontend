import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'sonner';

const SubmitRecipe = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Access Denied", { description: "Please login to share your recipes! 🛑" });
      navigate('/login');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    title: '', ingredients: '', instructions: '', category: 'Breakfast',
    time: '', difficulty: 'Easy', image: '', description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;

    setLoading(true);
    const toastId = toast.loading("Uploading your recipe...");

    try {
      // FIX: Changed to REACT_APP prefix
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData) 
      });

      if (response.ok) {
        toast.success("Cooking Fire! 🔥", { description: "Recipe shared successfully!", id: toastId });
        setTimeout(() => navigate('/recipes'), 1500);
      } else {
        const errData = await response.json();
        toast.error("Submission Failed", { description: errData.message || "Error saving recipe.", id: toastId });
      }
    } catch (err) {
      toast.error("Server Error", { description: "Check connection.", id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#111827] min-h-screen p-4 md:p-8 pt-24 text-white font-sans">
      <Toaster position="top-center" richColors theme="dark" closeButton />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto bg-[#1f2937] p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-gray-800 shadow-2xl">
        <header className="mb-10 text-center">
          <h2 className="text-2xl md:text-4xl font-black mb-2 uppercase tracking-tight">Share Your <span className="text-orange-500">Recipe</span></h2>
          <p className="text-gray-400 font-medium">Join our exclusive community of chefs.</p>
        </header>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Recipe Title</label>
            <input type="text" required className="w-full mt-1 p-4 bg-[#111827] rounded-2xl outline-none border border-gray-700 focus:ring-2 ring-orange-500" placeholder="e.g. Italian Pasta" onChange={(e) => setFormData({...formData, title: e.target.value})} />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Ingredients</label>
            <textarea rows="4" required className="w-full mt-1 p-4 bg-[#111827] rounded-2xl outline-none border border-gray-700 focus:ring-2 ring-orange-500" onChange={(e) => setFormData({...formData, ingredients: e.target.value})}></textarea>
          </div>
          <div>
             <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Category</label>
             <select className="w-full mt-1 p-4 bg-[#111827] rounded-2xl border border-gray-700 outline-none focus:ring-2 ring-orange-500" onChange={(e) => setFormData({...formData, category: e.target.value})}>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Desserts">Desserts</option>
             </select>
          </div>
          <div>
             <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Prep Time</label>
             <input type="text" required className="w-full mt-1 p-4 bg-[#111827] rounded-2xl border border-gray-700 outline-none focus:ring-2 ring-orange-500" placeholder="30 mins" onChange={(e) => setFormData({...formData, time: e.target.value})} />
          </div>
          <div className="md:col-span-2">
             <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Image URL</label>
             <input type="url" required className="w-full mt-1 p-4 bg-[#111827] rounded-2xl border border-gray-700 outline-none focus:ring-2 ring-orange-500" onChange={(e) => setFormData({...formData, image: e.target.value})} />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Instructions</label>
            <textarea rows="5" required className="w-full mt-1 p-4 bg-[#111827] rounded-2xl border border-gray-700 outline-none focus:ring-2 ring-orange-500" onChange={(e) => setFormData({...formData, instructions: e.target.value})}></textarea>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} type="submit" disabled={loading} className="md:col-span-2 bg-orange-500 py-5 rounded-2xl font-black text-xl uppercase shadow-xl transition-all disabled:opacity-50">
            {loading ? 'Verifying Chef...' : 'Publish Recipe'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
export default SubmitRecipe;