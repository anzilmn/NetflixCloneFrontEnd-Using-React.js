import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return setError("Passwords do not match");

    try {
      await axiosInstance.post('/auth/register', { email, password });
      navigate('/login'); // Redirect to login after successful signup
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="relative h-screen w-screen bg-black">
      <img 
        src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bca1-0743f0714102/0595f991-3d56-433c-83d7-80d1396b6941/IN-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg" 
        className="hidden sm:block absolute h-full w-full object-cover opacity-50"
        alt="background"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black/75 p-16 w-full max-w-md rounded-md z-10">
          <h2 className="text-white text-4xl font-semibold mb-8">Sign Up</h2>
          {error && <div className="bg-[#e87c03] p-3 rounded mb-4 text-white text-sm">{error}</div>}
          <form onSubmit={handleSignup} className="flex flex-col space-y-4">
            <input 
              type="email" placeholder="Email"
              className="p-4 bg-[#333] text-white rounded outline-none"
              onChange={(e) => setEmail(e.target.value)} required
            />
            <input 
              type="password" placeholder="Password"
              className="p-4 bg-[#333] text-white rounded outline-none"
              onChange={(e) => setPassword(e.target.value)} required
            />
            <input 
              type="password" placeholder="Confirm Password"
              className="p-4 bg-[#333] text-white rounded outline-none"
              onChange={(e) => setConfirmPassword(e.target.value)} required
            />
            <button className="bg-netflix-red text-white p-3 rounded font-bold text-lg mt-4">Sign Up</button>
          </form>
          <p className="text-gray-500 mt-8">Already have an account? <span className="text-white cursor-pointer hover:underline" onClick={() => navigate('/login')}>Sign in.</span></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;