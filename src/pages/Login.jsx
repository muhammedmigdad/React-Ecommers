
import React, { useState } from 'react';
import { loginAccount, registerAccount } from '../compontents/data/login.js'; // Import API functions
import { useNavigate } from "react-router-dom";

function Login() {
  const [currentState, setCurrentState] = useState('Sign Up');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  // Handle form submission
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

      // Store token if needed
      localStorage.setItem('authToken', response.token);
      // alert(`${currentState} successful!`);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="text-3xl font-bold">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {currentState !== 'Login' && (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
            required
          />
        )}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Email"
          required
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
          required
        />

        <div className="flex justify-between w-full text-sm mt-[-8px]">
          <p className="cursor-pointer">Forgot your password?</p>
          {currentState === 'Login' ? (
            <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">
              Create account
            </p>
          ) : (
            <p onClick={() => setCurrentState('Login')} className="cursor-pointer">
              Login Here
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-black text-white mb-3 font-light px-8 py-2 mt-4 rounded-md transition-transform duration-200 hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Processing...
            </>
          ) : currentState === "Login" ? (
            "Sign In"
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
}

export default Login;
