import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import DynamicMap from '@/components/DynamicMap';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useDispatch } from "react-redux";
import { registerCompany, registerUser } from "@/store/authSlice";
import type { AppDispatch } from "@/store/store";

type Position = {
  lat: number;
  lng: number;
};

const Register = () => {
  const [activeTab, setActiveTab] = useState("user");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  // User form data
  const [userFormData, setUserFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  // Company form data
  const [companyFormData, setCompanyFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
    address: '',
    name: '',
    record: '',
    url: '',
  });

  const [position, setPosition] = useState<Position>({
    lat: 35.52,
    lng: 35.8,
  });

  const [locationText, setLocationText] = useState("Latakia, Syria");
  const [isEditingLocation, setIsEditingLocation] = useState(false);

  const validateUserForm = () => {
    if (!userFormData.username.trim()) return 'Username is required.';
    if (!userFormData.fullname.trim()) return 'Full Name is required.';
    if (!userFormData.email.trim()) return 'Email is required.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userFormData.email)) return 'Invalid email address.';
    if (!userFormData.phone.trim()) return 'Phone Number is required.';
    if (!userFormData.address.trim()) return 'Address is required.';
    if (!userFormData.password) return 'Password is required.';
    if (userFormData.password.length < 6) return 'Password must be at least 6 characters.';
    if (userFormData.password !== userFormData.confirmPassword) return 'Passwords do not match.';
    return null;
  };

  const validateCompanyForm = () => {
    if (!companyFormData.username.trim()) return 'Username is required.';
    if (!companyFormData.password) return 'Password is required.';
    if (companyFormData.password.length < 6) return 'Password must be at least 6 characters.';
    if (!companyFormData.email.trim()) return 'Email is required.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(companyFormData.email)) return 'Invalid email address.';
    if (!companyFormData.phone.trim()) return 'Phone Number is required.';
    if (!companyFormData.address.trim()) return 'Address is required.';
    if (!companyFormData.name.trim()) return 'Factory name is required.';
    if (!companyFormData.record.trim()) return 'Commercial record is required.';
    return null;
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = activeTab === "user" ? validateUserForm() : validateCompanyForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const finalData = {
      ...(activeTab === "user" ? userFormData : companyFormData),
      location: locationText,
      lat: position.lat,
      lng: position.lng,
    };

    toast.success("Form is valid. Ready to submit.");
    console.log("Final Data", finalData);

    if (activeTab === "user") {
      const resultAction = await dispatch(
        registerUser(finalData)
      );

      if (registerUser.fulfilled.match(resultAction)) {
        toast.success("Welcome back, Company!");
        navigate("/dashboard");
      } else {
        // الخطأ في reject
        const errMsg = (resultAction.payload as string) || "Register failed";
        setApiError(errMsg);
        toast.error(errMsg);
      }
    } else {
      const resultAction = await dispatch(
        registerCompany(finalData)
      );

      if (registerCompany.fulfilled.match(resultAction)) {
        toast.success("Welcome back!");
        navigate("/dashboard");
      } else {
        const errMsg = (resultAction.payload as string) || "Register failed";
        setApiError(errMsg);
        toast.error(errMsg);
      }
    }
    
  };

  const handlePositionChange = useCallback((pos: Position) => {
    if (isEditingLocation) {
      setPosition(pos);
    }
  }, [isEditingLocation]);

  const handleAddressChange = useCallback((newAddr: string) => {
    if (isEditingLocation) {
      setLocationText(newAddr);
    }
  }, [isEditingLocation]);

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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user">User</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
          </TabsList>

          <TabsContent value="user" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>User Registration</CardTitle>
                <CardDescription>
                  Register as a regular user to access our platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid gap-2">
                    <Label htmlFor="user-username">Username</Label>
                    <Input
                      id="user-username"
                      name="username"
                      placeholder="Username"
                      value={userFormData.username}
                      onChange={handleUserChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="user-fullname">Full Name</Label>
                    <Input
                      id="user-fullname"
                      name="fullname"
                      placeholder="Full Name"
                      value={userFormData.fullname}
                      onChange={handleUserChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="user-email">Email</Label>
                    <Input
                      id="user-email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={userFormData.email}
                      onChange={handleUserChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="user-phone">Phone Number</Label>
                    <Input
                      id="user-phone"
                      name="phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={userFormData.phone}
                      onChange={handleUserChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="user-location">Location</Label>
                    <Input
                      id="user-location"
                      name="location"
                      value={locationText}
                      onChange={(e) => setLocationText(e.target.value)}
                      placeholder="e.g., Latakia, Syria"
                      disabled={!isEditingLocation}
                    />
                  </div>

                  <DynamicMap
                    initialPosition={position}
                    address={locationText}
                    onPositionChange={handlePositionChange}
                    onAddressChange={handleAddressChange}
                    isEditable={isEditingLocation}
                  />

                  <Button
                    type="button"
                    onClick={isEditingLocation ? handleConfirmLocation : handleEditLocation}
                    className="w-full"
                    variant={isEditingLocation ? "default" : "outline"}
                  >
                    {isEditingLocation ? "Confirm Location" : "Edit Location"}
                  </Button>

                  <div className="grid gap-2">
                    <Label htmlFor="user-address">Full Address</Label>
                    <Input
                      id="user-address"
                      name="address"
                      placeholder="Full Address"
                      value={userFormData.address}
                      onChange={handleUserChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="user-password">Password</Label>
                    <Input
                      id="user-password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={userFormData.password}
                      onChange={handleUserChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="user-confirm-password">Confirm Password</Label>
                    <Input
                      id="user-confirm-password"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      value={userFormData.confirmPassword}
                      onChange={handleUserChange}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-[#86efac] hover:bg-[#4ade80]">
                    Sign Up as User
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="company" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Registration</CardTitle>
                <CardDescription>
                  Register your company to access business features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid gap-2">
                    <Label htmlFor="company-username">Username</Label>
                    <Input
                      id="company-username"
                      name="username"
                      placeholder="Username"
                      value={companyFormData.username}
                      onChange={handleCompanyChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input
                      id="company-name"
                      name="name"
                      placeholder="Company/Factory Name"
                      value={companyFormData.name}
                      onChange={handleCompanyChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="company-record">Commercial Record</Label>
                    <Input
                      id="company-record"
                      name="record"
                      placeholder="Commercial Record"
                      value={companyFormData.record}
                      onChange={handleCompanyChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="company-url">Website URL</Label>
                    <Input
                      id="company-url"
                      name="url"
                      placeholder="Website URL (optional)"
                      value={companyFormData.url}
                      onChange={handleCompanyChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="company-email">Email</Label>
                    <Input
                      id="company-email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={companyFormData.email}
                      onChange={handleCompanyChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="company-phone">Phone Number</Label>
                    <Input
                      id="company-phone"
                      name="phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={companyFormData.phone}
                      onChange={handleCompanyChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="company-location">Location</Label>
                    <Input
                      id="company-location"
                      name="location"
                      value={locationText}
                      onChange={(e) => setLocationText(e.target.value)}
                      placeholder="e.g., Latakia, Syria"
                      disabled={!isEditingLocation}
                    />
                  </div>

                  <DynamicMap
                    initialPosition={position}
                    address={locationText}
                    onPositionChange={handlePositionChange}
                    onAddressChange={handleAddressChange}
                    isEditable={isEditingLocation}
                  />

                  <Button
                    type="button"
                    onClick={isEditingLocation ? handleConfirmLocation : handleEditLocation}
                    className="w-full"
                    variant={isEditingLocation ? "default" : "outline"}
                  >
                    {isEditingLocation ? "Confirm Location" : "Edit Location"}
                  </Button>

                  <div className="grid gap-2">
                    <Label htmlFor="company-address">Full Address</Label>
                    <Input
                      id="company-address"
                      name="address"
                      placeholder="Full Address"
                      value={companyFormData.address}
                      onChange={handleCompanyChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="company-password">Password</Label>
                    <Input
                      id="company-password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={companyFormData.password}
                      onChange={handleCompanyChange}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-[#86efac] hover:bg-[#4ade80]">
                    Sign Up as Company
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

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