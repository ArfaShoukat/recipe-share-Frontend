import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/recipes/${id}`)
      .then(res => res.json())
      .then(data => setRecipe(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!recipe) return <div className="min-h-screen bg-[#111827] text-white flex justify-center items-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#111827] text-white p-8 font-sans">
      <button onClick={() => navigate(-1)} className="mb-8 text-orange-500 font-bold flex items-center gap-2 hover:translate-x-[-5px] transition-all">
        ← Back to Feed
      </button>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-[#1f2937] p-8 rounded-[40px] border border-gray-800 shadow-2xl">
        {/* Left Side: Image */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          <img src={recipe.image} className="w-full h-full object-cover" alt={recipe.title} />
          <div className="absolute top-4 left-4 bg-orange-500 px-4 py-2 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg">
            {recipe.category}
          </div>
        </div>

        <div>
          <h1 className="text-5xl font-black mb-4 text-orange-500 leading-tight">{recipe.title}</h1>
          <div className="flex gap-6 mb-8 text-sm font-bold text-gray-400">
            <span>⏱ {recipe.time}</span>
            <span>🔥 {recipe.difficulty}</span>
            <span>⭐ {recipe.rating || '5.0'} Rating</span>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2 flex items-center gap-2">
              📝 Ingredients
            </h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">{recipe.ingredients}</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2 flex items-center gap-2">
              👨‍🍳 Instructions
            </h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line bg-black/20 p-6 rounded-2xl italic border border-orange-500/10">
              {recipe.instructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;