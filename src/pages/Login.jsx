import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) setUser({ email: savedEmail });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/login' : '/api/register';
    const toastId = toast.loading(isLogin ? 'Signing in...' : 'Creating account...');

    try {
     // Isay replace karein:
const response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (response.ok) {
        if (isLogin) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userEmail', data.email);
          setUser({ email: data.email });
          toast.success("Welcome back!", { description: "Login Successful! 🚀", id: toastId });
          setTimeout(() => navigate('/'), 1500);
        } else {
          toast.success("Account Created!", { description: "Registration Successful. Please Login.", id: toastId });
          setIsLogin(true); 
        }
      } else {
        toast.error("Authentication Failed", { description: data.message || "Invalid Credentials!", id: toastId });
      }
    } catch (err) {
      toast.error("Server Error", { description: "Check if backend is running.", id: toastId });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    toast.info("Logged out successfully");
    navigate('/');
  };

  if (user) {
    return (
      <div className="bg-[#0a0f1a] min-h-screen flex items-center justify-center p-4 sm:p-6 text-white font-sans">
        <Toaster position="top-center" richColors theme="dark" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-sm w-full bg-[#1f2937] p-6 sm:p-10 rounded-[2.5rem] border border-gray-800 text-center shadow-2xl"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl sm:text-4xl font-black border-4 border-gray-700 shadow-lg shadow-orange-500/20">
            {user.email[0].toUpperCase()}
          </div>
          <h2 className="text-lg sm:text-2xl font-bold break-all leading-tight px-2">{user.email}</h2>
          <p className="text-orange-500 text-xs sm:text-sm mb-8 mt-2 italic uppercase tracking-widest font-bold opacity-80">Official Recipe Contributor</p>
          <button 
            onClick={handleLogout} 
            className="w-full bg-red-500/10 border border-red-500/50 text-red-500 py-3 sm:py-4 rounded-2xl font-black uppercase hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-lg"
          >
            Logout From Account
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0f1a] min-h-screen flex items-center justify-center p-4 sm:p-6 text-white font-sans">
      <Toaster position="top-center" richColors closeButton theme="dark" />
      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-[#1f2937] p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-gray-800 shadow-2xl"
      >
        <h2 className="text-3xl sm:text-4xl font-black text-center mb-8 uppercase tracking-tighter leading-none">
          {isLogin ? 'Welcome ' : 'Create '}
          <span className="text-orange-500">{isLogin ? 'Back' : 'Account'}</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 mb-1 block">Email Address</label>
            <input 
              type="email" 
              className="w-full p-3 sm:p-4 bg-[#0a0f1a] rounded-xl sm:rounded-2xl outline-none focus:ring-2 ring-orange-500 transition border border-gray-800 text-sm sm:text-base"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div>
            <label className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 mb-1 block">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                className="w-full p-3 sm:p-4 bg-[#0a0f1a] rounded-xl sm:rounded-2xl outline-none focus:ring-2 ring-orange-500 pr-12 transition border border-gray-800 text-sm sm:text-base"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500 transition"
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-orange-500 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg hover:bg-orange-600 transition shadow-lg uppercase tracking-tighter mt-4"
          >
            {isLogin ? 'Sign In' : 'Register Now'}
          </motion.button>
        </form>
        <p className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-gray-400 font-medium">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-orange-500 font-black hover:underline transition ml-1 uppercase"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};
export default Login;