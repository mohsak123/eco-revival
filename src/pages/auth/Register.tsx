import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import DynamicMap from '@/components/DynamicMap';

type Position = {
  lat: number;
  lng: number;
};

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const [position, setPosition] = useState<Position>({
    lat: 35.52,
    lng: 35.8,
  });

  const [locationText, setLocationText] = useState("Latakia, Syria");
  const [isEditingLocation, setIsEditingLocation] = useState(false);

  const validateForm = () => {
    if (!formData.username.trim()) return 'Username is required.';
    if (!formData.fullname.trim()) return 'Full Name is required.';
    if (!formData.email.trim()) return 'Email is required.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return 'Invalid email address.';
    if (!formData.phone.trim()) return 'Phone Number is required.';
    if (!formData.address.trim()) return 'Address is required.';
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

    toast.success("Form is valid. Ready to submit.");
    console.log("Final Data", { ...formData, position, locationText });
  };

  const handleEditLocation = () => setIsEditingLocation(true);
  const handleConfirmLocation = () => setIsEditingLocation(false);

  return (
    <div className="py-8 min-h-screen flex items-center justify-center bg-gradient-to-br from-[#86efac] to-white">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-eco-gray mb-2 flex items-center justify-center gap-1">
            <img src="/images/logo.jpg" alt="" className="w-[70px] h-[70px] object-cover" /> 
            Join Eco-Revival
          </h1>
          <p className="text-eco-gray">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
          <input
            name="fullname"
            type="text"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />

          {/* Location Name Field */}
          <input
            type="text"
            name="location"
            value={locationText}
            onChange={(e) => setLocationText(e.target.value)}
            placeholder="e.g., Latakia, Syria"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            disabled={!isEditingLocation}
          />

          {/* Map */}
          <DynamicMap
            initialPosition={position}
            address={locationText}
            onPositionChange={(pos) => {
              if (isEditingLocation) setPosition(pos);
            }}
            onAddressChange={(newAddr) => {
              if (isEditingLocation) setLocationText(newAddr);
            }}
            isEditable={isEditingLocation}
          />

          {!isEditingLocation ? (
            <button
              type="button"
              onClick={handleEditLocation}
              className="w-full bg-[#4ade80] text-white font-medium py-2 rounded"
            >
              Edit Location
            </button>
          ) : (
            <button
              type="button"
              onClick={handleConfirmLocation}
              className="w-full bg-[#22c55e] text-white font-medium py-2 rounded"
            >
              Confirm Location
            </button>
          )}

          <input
            name="address"
            type="text"
            placeholder="Full Address"
            value={formData.address}
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
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-[#86efac] hover:bg-[#4ade80] text-white font-semibold py-3 rounded-lg"
          >
            Sign Up
          </button>
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
