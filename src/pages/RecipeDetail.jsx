import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // FIX: Using Environment Variable instead of localhost
    fetch(`${process.env.REACT_APP_API_URL}/api/recipes/${id}`)
      .then(res => res.json())
      .then(data => {
        setRecipe(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#111827] text-white flex flex-col justify-center items-center">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-bold uppercase tracking-widest text-gray-400">Loading Recipe...</p>
    </div>
  );

  if (!recipe) return (
    <div className="min-h-screen bg-[#111827] text-white flex justify-center items-center font-bold">
      Recipe Not Found!
    </div>
  );

  return (
    <div className="min-h-screen bg-[#111827] text-white p-4 md:p-8 pt-24 font-sans">
      <button onClick={() => navigate(-1)} className="mb-8 text-orange-500 font-bold flex items-center gap-2 hover:translate-x-[-5px] transition-all">
        ← Back to Feed
      </button>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-[#1f2937] p-6 md:p-10 rounded-[2rem] md:rounded-[40px] border border-gray-800 shadow-2xl">
        {/* Left Side: Image */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl h-64 md:h-full">
          <img src={recipe.image} className="w-full h-full object-cover" alt={recipe.title} />
          <div className="absolute top-4 left-4 bg-orange-500 px-4 py-2 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg">
            {recipe.category}
          </div>
        </div>

        {/* Right Side: Content */}
        <div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 text-orange-500 leading-tight uppercase">{recipe.title}</h1>
          <div className="flex flex-wrap gap-4 mb-8 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <span className="bg-black/20 px-3 py-1 rounded-lg">⏱ {recipe.time}</span>
            <span className="bg-black/20 px-3 py-1 rounded-lg">🔥 {recipe.difficulty}</span>
            <span className="bg-black/20 px-3 py-1 rounded-lg">⭐ {recipe.rating || '5.0'} Rating</span>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2 flex items-center gap-2 uppercase tracking-tighter">
              📝 Ingredients
            </h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm md:text-base">{recipe.ingredients}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2 flex items-center gap-2 uppercase tracking-tighter">
              👨‍🍳 Instructions
            </h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line bg-black/20 p-6 rounded-2xl italic border border-orange-500/10 text-sm md:text-base">
              {recipe.instructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;