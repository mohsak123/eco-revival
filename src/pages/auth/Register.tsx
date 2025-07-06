import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('no');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateForm = () => {
    if (!fullName.trim()) return "Full Name is required.";
    if (!email.trim()) return "Email is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email address.";
    if (!phone.trim()) return "Phone Number is required.";
    if (!location.trim()) return "Location is required.";
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }
    toast.success('Registration successful!');
  };

  return (
    <div id="signupPage" className="py-8 min-h-screen flex items-center justify-center bg-gradient-to-br from-[#86efac] to-white">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-eco-gray mb-2">🌱 Join Eco-Revival</h1>
          <p className="text-eco-gray">Create your account</p>
        </div>
        <form id="signupForm" onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-eco-gray font-medium mb-2">Full Name</label>
            <input
              type="text"
              id="signupName"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86efac] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-eco-gray font-medium mb-2">Email</label>
            <input
              type="email"
              id="signupEmail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86efac] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-eco-gray font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              id="signupPhone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86efac] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-eco-gray font-medium mb-2">Location</label>
            <input
              type="text"
              id="signupLocation"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86efac] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-eco-gray font-medium mb-2">Are you a company?</label>
            <select
              id="signupCompany"
              value={company}
              onChange={e => setCompany(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86efac] focus:border-transparent"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          <div>
            <label className="block text-eco-gray font-medium mb-2">Password</label>
            <input
              type="password"
              id="signupPassword"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86efac] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-eco-gray font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              id="signupConfirmPassword"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86efac] focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer bg-[#86efac] hover:bg-[#4ade80] text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-6 text-eco-gray">
          Already have an account?{' '}
          <Link to="/login"
            onClick={() => { /* add login navigation */ }}
            className="text-[#4ade80] hover:underline font-medium cursor-pointer"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
