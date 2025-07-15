import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { registerUser } from '@/store/authSlice';

const Register = () => {
  // const dispatch = useAppDispatch();
  // const { loading, error } = useAppSelector(state => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    password: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    if (!formData.username.trim()) return 'Username is required.';
    if (!formData.fullname.trim()) return 'Full Name is required.';
    if (!formData.email.trim()) return 'Email is required.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return 'Invalid email address.';
    if (!formData.phone.trim()) return 'Phone Number is required.';
    if (!formData.password) return 'Password is required.';
    if (formData.password.length < 6) return 'Password must be at least 6 characters.';
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match.';
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }
    // dispatch(registerUser(formData))
    //   .unwrap()
    //   .then(() => toast.success('Registration successful!'))
    //   .catch(msg => toast.error(msg));
  };

  return (
    <div id="signupPage" className="py-8 min-h-screen flex items-center justify-center bg-gradient-to-br from-[#86efac] to-white">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-eco-gray mb-2">🌱 Join Eco-Revival</h1>
          <p className="text-eco-gray">Create your account</p>
        </div>
        <form id="signupForm" onSubmit={handleSubmit} className="space-y-4" noValidate>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            name="fullname"
            type="text"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            name="address"
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
          <input
            name="city"
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
          <input
            name="state"
            type="text"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            required
          />
          <button
            type="submit"
            // disabled={loading}
            className="w-full bg-[#86efac] hover:bg-[#4ade80] text-white font-semibold py-3 rounded-lg"
          >
            {/* {loading ? 'Registering...' : 'Sign Up'} */}
            Sign Up
          </button>
          {/* {error && <p className="text-red-600 mt-2">{error}</p>} */}
        </form>
        <p className="text-center mt-6 text-eco-gray">
          Already have an account?{' '}
          <Link to="/login" className="text-[#4ade80] hover:underline font-medium cursor-pointer">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
