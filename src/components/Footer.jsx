import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#1f2937] text-white border-t border-gray-800 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        <div className="space-y-4">
          <Link to="/" className="text-2xl font-black tracking-tighter">
            RECIPE<span className="text-orange-500">SHARE</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            The world's best platform for sharing and discovering amazing recipes. 
            Join our community of food lovers today!
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-4 text-orange-500">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/recipes" className="hover:text-white transition">Browse Recipes</Link></li>
            <li><Link to="/submit" className="hover:text-white transition">Submit Recipe</Link></li>
            <li><Link to="/login" className="hover:text-white transition">User Profile</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact & Info */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-orange-500">Contact Us</h4>
          <p className="text-gray-400 text-sm italic">
            Email: support@recipeshare.com<br />
            Location: Karachi, Pakistan
          </p>
          <div className="flex space-x-4 mt-4">
            {/* Social Icons (Placeholders) */}
            <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 cursor-pointer transition">f</span>
            <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 cursor-pointer transition">t</span>
            <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 cursor-pointer transition">i</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-xs">
        © 2026 RecipeShare. Designed by Arfa Shoukat. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;