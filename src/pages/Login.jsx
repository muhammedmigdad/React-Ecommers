import React, { useState, useRef } from 'react';
import { loginAccount, registerAccount } from '../compontents/data/login.js';
import { useNavigate } from "react-router-dom";
import { motion, useTransform, useScroll } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope, FaUserPlus, FaSignInAlt } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0, perspective: 300 },
  visible: {
    opacity: 1,
    perspective: 300,
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
};

const formVariants = {
  hidden: { y: 50, rotateX: -20, opacity: 0 },
  visible: { y: 0, rotateX: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut', delayChildren: 0.3, staggerChildren: 0.1 } },
};

const inputVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

const buttonVariants = {
  hover: { scale: 1.08, boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)' },
  tap: { scale: 0.95 },
};

const switchButtonVariants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
};

function Login() {
  const [currentState, setCurrentState] = useState('Sign Up');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: formRef });
  const rotateY = useTransform(scrollYProgress, [0, 1], [10, -10]); // Subtle 3D rotation on scroll

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

      localStorage.setItem('authToken', response.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-black"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.form
        ref={formRef}
        onSubmit={onSubmitHandler}
        className="bg-white shadow-2xl rounded-xl px-10 pt-8 pb-10 mb-4 w-[90%] sm:max-w-md relative"
        variants={formVariants}
        style={{ rotateY }}
      >
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-indigo-600 tracking-tight">{currentState === 'Login' ? 'Welcome Back' : 'Join Us'}</h2>
          <p className="text-gray-600 mt-2">{currentState === 'Login' ? 'Sign in to your account' : 'Create your new account'}</p>
        </div>

        {error && <motion.p className="text-red-500 text-sm mb-4" layout>{error}</motion.p>}

        {currentState !== 'Login' && (
          <motion.div className="mb-4" variants={inputVariants} layout>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              <FaUser className="inline-block mr-2 text-indigo-500" /> Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </motion.div>
        )}

        <motion.div className="mb-4" variants={inputVariants} layout>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            <FaEnvelope className="inline-block mr-2 text-indigo-500" /> Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
        </motion.div>

        <motion.div className="mb-6" variants={inputVariants} layout>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            <FaLock className="inline-block mr-2 text-indigo-500" /> Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Your Password"
            required
          />
        </motion.div>

        <motion.div className="flex items-center justify-between mb-4" variants={inputVariants} layout>
          <button
            className="inline-block align-baseline font-semibold text-sm text-indigo-500 hover:text-indigo-800 cursor-pointer focus:outline-none"
            onClick={() => alert('Forgot password functionality not implemented yet.')}
          >
            Forgot Password?
          </button>
        </motion.div>

        <motion.button
          className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline w-full"
          type="submit"
          disabled={loading}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          layout
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              Processing...
            </div>
          ) : currentState === "Login" ? (
            <>
              <FaSignInAlt className="inline-block mr-2" /> Sign In
            </>
          ) : (
            <>
              <FaUserPlus className="inline-block mr-2" /> Sign Up
            </>
          )}
        </motion.button>

        <motion.div className="mt-6 text-center" variants={inputVariants} layout>
          {currentState === 'Login' ? (
            <p className="text-sm text-gray-600">
              Don't have an account?
              <motion.button
                type="button"
                onClick={() => setCurrentState('Sign Up')}
                className="font-semibold text-indigo-500 hover:text-indigo-800 ml-1 focus:outline-none"
                variants={switchButtonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Create account
              </motion.button>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Already have an account?
              <motion.button
                type="button"
                onClick={() => setCurrentState('Login')}
                className="font-semibold text-indigo-500 hover:text-indigo-800 ml-1 focus:outline-none"
                variants={switchButtonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Login here
              </motion.button>
            </p>
          )}
        </motion.div>
      </motion.form>
    </motion.div>
  );
}

export default Login;