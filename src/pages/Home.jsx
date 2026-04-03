
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allRecipes, setAllRecipes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Fetch all recipes once for search logic
  useEffect(() => {
   fetch(`${process.env.REACT_APP_API_URL}/api/recipes`)
      .then(res => res.json())
      .then(data => setAllRecipes(data))
      .catch(err => console.error("Search fetch error:", err));
  }, []);

  // Filter suggestions as user types
  useEffect(() => {
    if (searchTerm.trim().length > 1) {
      const filtered = allRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, allRecipes]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) navigate(`/recipes?search=${searchTerm}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <div className="bg-[#0a0f1a] text-white min-h-screen font-sans overflow-x-hidden">
      <Navbar />
      
      <section className="relative h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear" }}
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=60"
            className="w-full h-full object-cover opacity-30" 
            alt="hero" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/80 to-transparent"></div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ willChange: "transform, opacity" }}
          className="relative z-10 text-center max-w-5xl"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-7xl md:text-[9rem] font-black mb-8 tracking-tighter leading-[0.9] uppercase"
          >
            Cooking <br /> <span className="text-orange-500 italic">Made Easy</span>
          </motion.h1>

          <div className="relative w-full max-w-2xl mx-auto">
            <motion.form 
              variants={itemVariants}
              onSubmit={handleSearch} 
              className="flex flex-col md:flex-row gap-4 bg-white/5 p-3 rounded-[2rem] border border-white/10 backdrop-blur-md"
            >
              <input 
                type="text" 
                placeholder="Search recipes..." 
                className="flex-1 bg-transparent p-5 px-8 outline-none text-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-orange-500 px-12 py-5 rounded-[1.5rem] font-black uppercase shadow-xl"
              >
                Search
              </motion.button>
            </motion.form>

            {/* LIVE SUGGESTIONS DROPDOWN */}
            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-[#1f2937] border border-gray-700 rounded-2xl overflow-hidden z-50 shadow-2xl text-left"
                >
                  {suggestions.map((s) => (
                    <div 
                      key={s._id}
                      onClick={() => navigate(`/recipe/${s._id}`)}
                      className="p-4 hover:bg-orange-500 transition cursor-pointer flex justify-between items-center"
                    >
                      <span>{s.title}</span>
                      <span className="text-xs opacity-60 uppercase">{s.category}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl font-black mb-16 tracking-tighter italic uppercase"
          >
            Categories
          </motion.h2>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
          >
            {['Breakfast', 'Lunch', 'Desserts', 'Dinner'].map((cat) => (
              <motion.div key={cat} variants={itemVariants}>
                <Link 
                  to={`/recipes?cat=${cat}`} 
                  className="group relative h-72 rounded-[2.5rem] overflow-hidden border border-white/10 flex items-center justify-center bg-[#111827]"
                  style={{ transform: "translateZ(0)" }}
                >
                  <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <div className="relative z-10 text-center">
                    <h3 className="text-3xl font-black uppercase tracking-tighter transition-transform duration-300 group-hover:scale-110">
                      {cat}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
      </section>
    </div>
  );
};

export default Home;