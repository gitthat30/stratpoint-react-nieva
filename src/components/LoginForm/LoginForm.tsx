import React from 'react';
import { Link } from 'react-router-dom';

interface LoginProps {
  email : string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleLogin: (email: string, password: string) => void;
  navigate: (navigate: string) => void;
}

export function LoginForm( { email, password, setEmail, setPassword, handleLogin }: LoginProps ) {

    function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log('Login attempt:', email, password);
        handleLogin(email, password); 
    };
    
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login to DigiWallet</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
            Log In
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register here</Link>
        </p>
      </div>
      </div>
    );
  };