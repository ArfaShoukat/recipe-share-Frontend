import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import { motion } from 'framer-motion';

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
              {/* Updated: Professional SVG Eye Icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500 transition"
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