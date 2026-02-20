import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(email, password);
    
    if (result.success) {
      navigate('/'); // Redirect to home on success
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="relative h-screen w-screen bg-black md:bg-transparent">
      {/* Background Image Overlay */}
      <img 
        src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bca1-0743f0714102/0595f991-3d56-433c-83d7-80d1396b6941/IN-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg" 
        className="hidden sm:block absolute h-full w-full object-cover opacity-50"
        alt="background"
      />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black/75 p-16 self-center mt-2 w-full max-w-md rounded-md">
          <h2 className="text-white text-4xl font-semibold mb-8">Sign In</h2>
          
          {error && (
            <div className="bg-[#e87c03] text-white text-[14px] p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input 
              type="email" 
              placeholder="Email or phone number"
              className="p-4 bg-[#333] text-white rounded-md outline-none focus:bg-[#454545]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Password"
              className="p-4 bg-[#333] text-white rounded-md outline-none focus:bg-[#454545]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              type="submit" 
              disabled={loading}
              className="bg-netflix-red text-white p-3 rounded-md font-semibold text-lg hover:bg-red-700 transition"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="flex justify-between items-center text-gray-400 text-sm mt-4">
            <div className="flex items-center space-x-1">
              <input type="checkbox" className="accent-gray-500" />
              <span>Remember me</span>
            </div>
            <p className="hover:underline cursor-pointer">Need help?</p>
          </div>

          <div className="mt-12 text-gray-500">
            New to Netflix? <span className="text-white hover:underline cursor-pointer" onClick={() => navigate('/signup')}>Sign up now.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;