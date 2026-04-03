import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Recipes', path: '/recipes' },
    { name: 'Submit', path: '/submit' },
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${
      scrolled ? 'bg-[#0a0f1a]/90 backdrop-blur-xl py-4 shadow-2xl' : 'bg-transparent py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-black tracking-tighter text-white group">
          Recipe<span className="text-orange-500">Share</span>
        </Link>

        <div className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="text-xs font-bold uppercase tracking-[0.2em] hover:text-orange-500 transition-all"
            >
              {link.name}
            </Link>
          ))}
          <Link to="/login" className="bg-orange-500 text-white px-8 py-2.5 rounded-full font-black text-xs hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20">
            LOGIN
          </Link>
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-white focus:outline-none z-[110] relative p-2"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <motion.span 
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 9 : 0 }} 
              className="block w-full h-0.5 bg-white rounded-full origin-center"
            ></motion.span>
            <motion.span 
              animate={{ opacity: isOpen ? 0 : 1, x: isOpen ? 20 : 0 }} 
              className="block w-full h-0.5 bg-white rounded-full"
            ></motion.span>
            <motion.span 
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -9 : 0 }} 
              className="block w-full h-0.5 bg-white rounded-full origin-center"
            ></motion.span>
          </div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#0a0f1a] z-[105] flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-12">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)} 
                  className="text-5xl font-black uppercase tracking-tighter text-white hover:text-orange-500 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/login" 
                onClick={() => setIsOpen(false)} 
                className="bg-orange-500 text-white px-16 py-5 rounded-2xl font-black text-2xl"
              >
                LOGIN
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;