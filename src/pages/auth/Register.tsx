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
import { registerCompany, registerUser, setRole } from "@/store/authSlice";
import type { AppDispatch } from "@/store/store";
import { useTranslation } from 'react-i18next';

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

    if (activeTab === "user") {
      const resultAction = await dispatch(
        registerUser(finalData)
      );

      if (registerUser.fulfilled.match(resultAction)) {
        dispatch(setRole("user"));
        toast.success("Welcome back, Company!");
        navigate("/");
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
        dispatch(setRole("admin"));
        toast.success("Factory account created. Awaiting admin approval.");
        navigate("/login");
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

  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <div className="py-8 min-h-screen flex items-center justify-center bg-gradient-to-br from-[#86efac] to-white"
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{ textAlign: isArabic ? 'right' : 'left' }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-eco-gray mb-2 flex items-center justify-center gap-1">
            <img src="/images/logo.jpg" alt="" className="w-[70px] h-[70px] object-cover" /> 
            {t('app_name')}
          </h1>
          <p className="text-eco-gray">{t('app_name')}</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user">{t('user')}</TabsTrigger>
            <TabsTrigger value="company">{t('company')}</TabsTrigger>
          </TabsList>

          <TabsContent value="user" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('user_register')}</CardTitle>
                <CardDescription>
                  {t('user_register_desc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4" noValidate
                  dir={isArabic ? 'rtl' : 'ltr'}
                  style={{ textAlign: isArabic ? 'right' : 'left' }}
                >
                  <div className="grid gap-2">
                    <Label htmlFor="user-username">{t('username')}</Label>
                    <Input
                      id="user-username"
                      name="username"
                      placeholder={t('username')}
                      value={userFormData.username}
                      onChange={handleUserChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="user-fullname">{t('full_name')}</Label>
                    <Input
                      id="user-fullname"
                      name="fullname"
                      placeholder={t('full_name')}
                      value={userFormData.fullname}
                      onChange={handleUserChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="user-email">{t('email')}</Label>
                    <Input
                      id="user-email"
                      name="email"
                      type="email"
                      placeholder={t('email')}
                      value={userFormData.email}
                      onChange={handleUserChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="user-phone">{t('phone')}</Label>
                    <Input
                      id="user-phone"
                      name="phone"
                      type="tel"
                      placeholder={t('phone')}
                      value={userFormData.phone}
                      onChange={handleUserChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="user-location">{t('location')}</Label>
                    <Input
                      id="user-location"
                      name={t('location')}
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
                    className="w-full cursor-pointer"
                    variant={isEditingLocation ? "default" : "outline"}
                  >
                    {isEditingLocation ? t('confirm_location') : t('edit_location')}
                  </Button>

                  <div className="grid gap-2">
                    <Label htmlFor="user-address">{t('address')}</Label>
                    <Input
                      id="user-address"
                      name="address"
                      placeholder={t('address')}
                      value={userFormData.address}
                      onChange={handleUserChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="user-password">{t('password')}</Label>
                    <Input
                      id="user-password"
                      name="password"
                      type="password"
                      placeholder={t('password')}
                      value={userFormData.password}
                      onChange={handleUserChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="user-confirm-password">{t('confirm_password')}</Label>
                    <Input
                      id="user-confirm-password"
                      name="confirmPassword"
                      type="password"
                      placeholder={t('confirm_password')}
                      value={userFormData.confirmPassword}
                      onChange={handleUserChange}
                    />
                  </div>

                  <Button type="submit" className="w-full hover:bg-[#86efac] bg-[#4ade80] cursor-pointer">
                    {t('signup_user')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="company" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('company_register')}</CardTitle>
                <CardDescription>
                  {t('company_register_desc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4" noValidate
                  dir={isArabic ? 'rtl' : 'ltr'}
                  style={{ textAlign: isArabic ? 'right' : 'left' }}
                >
                  <div className="grid gap-2">
                    <Label htmlFor="company-username">{t('username')}</Label>
                    <Input
                      id="company-username"
                      name="username"
                      placeholder={t('username')}
                      value={companyFormData.username}
                      onChange={handleCompanyChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="company-name">{t('company_title')}</Label>
                    <Input
                      id="company-name"
                      name="name"
                      placeholder={t('company_title')}
                      value={companyFormData.name}
                      onChange={handleCompanyChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="company-record">{t('record')}</Label>
                    <Input
                      id="company-record"
                      name="record"
                      placeholder={t('record')}
                      value={companyFormData.record}
                      onChange={handleCompanyChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="company-url">{t('website')}</Label>
                    <Input
                      id="company-url"
                      name="url"
                      placeholder={t('website')}
                      value={companyFormData.url}
                      onChange={handleCompanyChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="company-email">{t('email')}</Label>
                    <Input
                      id="company-email"
                      name="email"
                      type="email"
                      placeholder={t('email')}
                      value={companyFormData.email}
                      onChange={handleCompanyChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="company-phone">{t('phone')}</Label>
                    <Input
                      id="company-phone"
                      name="phone"
                      type="tel"
                      placeholder={t('phone')}
                      value={companyFormData.phone}
                      onChange={handleCompanyChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="company-location">{t('location')}</Label>
                    <Input
                      id="company-location"
                      name={t('location')}
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
                    className="w-full cursor-pointer"
                    variant={isEditingLocation ? "default" : "outline"}
                  >
                    {isEditingLocation ? t('confirm_location') : t('edit_location')}
                  </Button>

                  <div className="grid gap-2">
                    <Label htmlFor="company-address">{t('address')}</Label>
                    <Input
                      id="company-address"
                      name="address"
                      placeholder={t('address')}
                      value={companyFormData.address}
                      onChange={handleCompanyChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="company-password">{t('password')}</Label>
                    <Input
                      id="company-password"
                      name="password"
                      type="password"
                      placeholder={t('password')}
                      value={companyFormData.password}
                      onChange={handleCompanyChange}
                    />
                  </div>

                  <Button type="submit" className="w-full hover:bg-[#86efac] bg-[#4ade80] cursor-pointer">
                    {t('signup_company')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <p className="text-center mt-6 text-eco-gray">
          {t('have_account')}{' '}
          <Link to="/login" className="text-[#4ade80] hover:underline font-medium cursor-pointer">
            {t('login')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;