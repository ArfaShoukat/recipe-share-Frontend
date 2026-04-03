import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import { motion } from 'framer-motion';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Creating your chef profile...");

    try {
      // Isay replace karein:
const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();

      if (response.ok) {
        toast.success("Welcome to ArfaChef! 🎉", {
          description: "Registration successful. Redirecting to login...",
          id: toastId,
        });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error("Registration Failed", {
          description: data.message || "Account creation failed.",
          id: toastId,
        });
      }
    } catch (err) {
      toast.error("Network Error", {
        description: "Please check if your backend is running.",
        id: toastId,
      });
    }
  };

  return (
    <div className="bg-[#0a0f1a] min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 text-white font-sans">
      <Toaster position="top-center" richColors theme="dark" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[95%] sm:max-w-md bg-[#1f2937] p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-gray-800 shadow-2xl"
      >
        <h2 className="text-3xl sm:text-4xl font-black text-center mb-6 sm:mb-8 uppercase tracking-tighter leading-none">
          Create <span className="text-orange-500">Account</span>
        </h2>
        <form onSubmit={handleRegister} className="space-y-4 sm:space-y-6">
          <div className="flex flex-col">
            <label className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 mb-1">Email Address</label>
            <input 
              type="email" 
              className="w-full p-3 sm:p-4 bg-[#0a0f1a] rounded-xl sm:rounded-2xl outline-none focus:ring-2 ring-orange-500 border border-gray-800 transition text-sm sm:text-base"
              placeholder="chef@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full p-3 sm:p-4 bg-[#0a0f1a] rounded-xl sm:rounded-2xl outline-none focus:ring-2 ring-orange-500 border border-gray-800 transition text-sm sm:text-base"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-orange-500 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg hover:bg-orange-600 transition shadow-lg uppercase tracking-tighter mt-2"
          >
            Register Now
          </motion.button>
          <p className="text-center text-xs sm:text-sm text-gray-400 font-medium pt-2">
            Already have an account? <Link to="/login" className="text-orange-500 font-bold hover:underline">Login Here</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};
export default Register;