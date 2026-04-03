import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import { motion } from 'framer-motion';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Creating your chef profile...");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
        method: 'POST', // Method add kiya
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
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                className="w-full p-3 sm:p-4 bg-[#0a0f1a] rounded-xl sm:rounded-2xl outline-none focus:ring-2 ring-orange-500 border border-gray-800 transition text-sm sm:text-base pr-12"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              {/* Updated: Professional Eye Icon instead of monkey */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500 transition text-xl"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12.002a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              </button>
            </div>
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