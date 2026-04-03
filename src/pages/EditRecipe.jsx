import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'sonner'; 

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    category: 'Breakfast',
    time: '',
    difficulty: 'Easy',
    image: '',
    description: ''
  });

  useEffect(() => {
    // Initial fetch ke liye loading toast
    const fetchId = toast.loading("Fetching recipe details...");

    // Sahi:
fetch(`${process.env.REACT_APP_API_URL}/api/recipes/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Recipe not found");
        return res.json();
      })
      .then(data => {
        if (data) {
          const { owner, _id, __v, ...rest } = data;
          setFormData(rest);
          toast.dismiss(fetchId); // Data milne par loading khatam
        }
      })
      .catch(err => {
        toast.error("Error", {
          description: "Could not load recipe details.",
          id: fetchId
        });
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    
    // 2. Update loading toast
    const updateId = toast.loading("Saving changes...");

    try {
      const response = await fetch(`http://localhost:5000/api/recipes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Success!", {
          description: "Recipe updated successfully! ✨",
          id: updateId
        });
        
        setTimeout(() => navigate('/recipes'), 1500);
      } else {
        toast.error("Failed to update", {
          description: result.message || "Something went wrong.",
          id: updateId
        });
      }
    } catch (err) {
      toast.error("Server Error", {
        description: "Connection to backend failed.",
        id: updateId
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#111827] min-h-screen p-8 text-white font-sans">
      {/* 3. Toaster Container */}
      <Toaster position="top-right" richColors theme="dark" closeButton />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-[#1f2937] p-10 rounded-[2.5rem] border border-gray-800 shadow-2xl"
      >
        <header className="mb-10 text-center">
          <h2 className="text-4xl font-black mb-2 uppercase tracking-tight">
            Edit Your <span className="text-orange-500">Recipe</span>
          </h2>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="text-sm text-gray-400 ml-1 font-bold uppercase tracking-widest">Recipe Title</label>
            <input 
              type="text" required
              value={formData.title}
              className="w-full mt-1 p-4 bg-gray-800 rounded-2xl outline-none focus:ring-2 ring-orange-500 border border-gray-700 transition"
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-400 ml-1 font-bold uppercase tracking-widest">Ingredients</label>
            <textarea 
              rows="4" required
              value={formData.ingredients}
              className="w-full mt-1 p-4 bg-gray-800 rounded-2xl outline-none focus:ring-2 ring-orange-500 border border-gray-700 transition"
              onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
            ></textarea>
          </div>

          <div>
            <label className="text-sm text-gray-400 ml-1 font-bold uppercase tracking-widest">Category</label>
            <select 
              value={formData.category}
              className="w-full mt-1 p-4 bg-gray-800 rounded-2xl border border-gray-700 outline-none focus:ring-2 ring-orange-500"
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Desserts">Desserts</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400 ml-1 font-bold uppercase tracking-widest">Cooking Time</label>
            <input 
              type="text" required
              value={formData.time}
              className="w-full mt-1 p-4 bg-gray-800 rounded-2xl border border-gray-700 outline-none focus:ring-2 ring-orange-500"
              onChange={(e) => setFormData({...formData, time: e.target.value})}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-400 ml-1 font-bold uppercase tracking-widest">Image Link</label>
            <input 
              type="text" required
              value={formData.image}
              className="w-full mt-1 p-4 bg-gray-800 rounded-2xl border border-gray-700 outline-none focus:ring-2 ring-orange-500"
              onChange={(e) => setFormData({...formData, image: e.target.value})}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-400 ml-1 font-bold uppercase tracking-widest">Preparation Steps</label>
            <textarea 
              rows="6" required
              value={formData.instructions}
              className="w-full mt-1 p-4 bg-gray-800 rounded-2xl border border-gray-700 outline-none focus:ring-2 ring-orange-500 transition"
              onChange={(e) => setFormData({...formData, instructions: e.target.value})}
            ></textarea>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            disabled={loading}
            className="md:col-span-2 bg-orange-500 hover:bg-orange-600 py-4 rounded-2xl font-black text-lg shadow-xl uppercase tracking-tighter transition-all disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Save Changes'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EditRecipe;