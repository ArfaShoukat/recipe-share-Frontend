import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('search');
  const catTerm = queryParams.get('cat');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/recipes`)
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
        applyFilters(data);
      })
      .catch(err => console.error("Fetch error:", err));
  }, [location.search]);

  const applyFilters = (data) => {
    let temp = [...data];
    if (searchTerm) temp = temp.filter(r => r.title.toLowerCase().includes(searchTerm.toLowerCase()));
    if (catTerm) temp = temp.filter(r => r.category === catTerm);
    setFilteredRecipes(temp);
  };

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      return payload.userId; 
    } catch (e) { return null; }
  };

  const currentUserId = getUserIdFromToken();

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Delete this recipe?")) return;
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    if (res.ok) {
      setFilteredRecipes(filteredRecipes.filter(r => r._id !== id));
      alert("Recipe Deleted ✅");
    }
  };

  return (
    <div className="p-8 bg-[#111827] min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-black mb-12 uppercase text-center">
          {searchTerm ? `Results for "${searchTerm}"` : catTerm ? `${catTerm} Recipes` : 'Explore Recipes'}
        </h2>
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredRecipes.map(r => (
              <motion.div key={r._id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#1f2937] rounded-3xl overflow-hidden relative border border-gray-800 shadow-xl group">
                <img src={r.image} className="w-full h-56 object-cover" alt={r.title} />
                {currentUserId && r.owner?.toString() === currentUserId?.toString() && (
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => { e.stopPropagation(); navigate(`/edit-recipe/${r._id}`); }} className="bg-black/70 p-2 rounded-full hover:bg-orange-500">✏️</button>
                    <button onClick={(e) => handleDelete(e, r._id)} className="bg-black/70 p-2 rounded-full hover:bg-red-500">🗑️</button>
                  </div>
                )}
                <div className="p-5">
                  <span className="bg-orange-500/10 text-orange-500 text-[10px] px-3 py-1 rounded-full font-bold uppercase">{r.category}</span>
                  <h3 className="text-xl font-bold mt-2">{r.title}</h3>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-400 text-sm">⏱ {r.time}</span>
                    <button onClick={() => navigate(`/recipe/${r._id}`)} className="text-orange-500 font-bold">VIEW DETAILS →</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#1f2937] rounded-[3rem] border border-dashed border-gray-700">
            <h3 className="text-3xl font-black text-gray-500 uppercase italic">No recipes found.</h3>
          </div>
        )}
      </div>
    </div>
  );
};
export default RecipeList;