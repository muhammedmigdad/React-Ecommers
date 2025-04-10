import React, { useState, useRef } from 'react';
import { loginAccount, registerAccount } from '../compontents/data/login';
import { useNavigate } from "react-router-dom";
import { motion, useTransform, useScroll } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-toastify';

function Login() {
  const [currentState, setCurrentState] = useState('Sign Up');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: formRef });
  const rotateY = useTransform(scrollYProgress, [0, 1], [10, -10]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      let response;
      if (currentState === 'Login') {
        response = await loginAccount({ email: formData.email, password: formData.password });
      } else {
        response = await registerAccount(formData);
      }

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      toast.success(currentState === 'Login' ? 'Successfully logged in!' : 'Account created successfully!');
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || 'Something went wrong. Please try again.';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-black"
      initial="hidden"
      animate="visible"
    >
      <motion.form
        ref={formRef}
        onSubmit={onSubmitHandler}
        className="bg-white shadow-2xl rounded-xl px-10 pt-8 pb-10 w-[90%] sm:max-w-md"
        style={{ rotateY }}
      >
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-indigo-600">{currentState === 'Login' ? 'Welcome Back' : 'Join Us'}</h2>
          <p className="text-gray-600 mt-2">{currentState === 'Login' ? 'Sign in to your account' : 'Create your new account'}</p>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {currentState !== 'Login' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              <FaUser className="inline-block mr-2 text-indigo-500" /> Name
            </label>
            <input
              className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            <FaEnvelope className="inline-block mr-2 text-indigo-500" /> Email
          </label>
          <input
            className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            <FaLock className="inline-block mr-2 text-indigo-500" /> Password
          </label>
          <input
            className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none"
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Your Password"
            required
          />
        </div>

        <button
          className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-full w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Processing...' : currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>

        <div className="mt-6 text-center">
          {currentState === 'Login' ? (
            <p className="text-sm text-gray-600">
              Don't have an account?
              <button
                type="button"
                onClick={() => setCurrentState('Sign Up')}
                className="text-indigo-500 ml-1 underline"
              >
                Create account
              </button>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Already have an account?
              <button
                type="button"
                onClick={() => setCurrentState('Login')}
                className="text-indigo-500 ml-1 underline"
              >
                Login here
              </button>
            </p>
          )}
        </div>
      </motion.form>
    </motion.div>
  );
}

export default Login;
