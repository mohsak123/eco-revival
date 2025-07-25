import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Factories from './pages/Factories';
import Profile from './pages/Profile';
import Help from './pages/Help';
import Add from './pages/Add';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import AdminOrders from './pages/admin/AdminOrders';
import Delegates from './pages/admin/Delegates';
import AdminHelp from './pages/admin/AdminHelp';
import AdminAccount from './pages/admin/AdminAccount';
import toast, { Toaster } from "react-hot-toast";
import PrivateRoutes from './utils/privateRoutes';
import SingleFactory from './pages/SingleFactory';
import PlaceOrder from './pages/PlaceOrder';
import type { AppDispatch, RootState } from './store/store';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getProfile, getProfileCompany } from './store/authSlice';

const NotFound = () => (
  <div className='text-3xl text-red-500 flex items-center justify-center h-screen'>404 - Page Not Found</div>
);

const App = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const role = localStorage.getItem("role") === "admin" ? "admin" : "user";
  const [, setApiError] = useState<string | null>(null);

  const { i18n } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const supportedLangs = ["ar", "en"];
  let lan = localStorage.getItem("i18nextLng") || "en";

  if (!supportedLangs.includes(lan)) {
    lan = "en";
    localStorage.setItem("i18nextLng", "en");
  }

  const isAuthenticated = !!(user && token);

  useEffect(() => {
    document.documentElement.dir = lan === 'ar' ? 'rtl' : 'ltr';

    if (i18n.language !== lan) {
      i18n.changeLanguage(lan);
    }
  }, [lan, i18n]);


  useEffect(() => {
    const fetchProfile = async () => {
      if (role === "admin") {
        const resultAction = await dispatch(getProfileCompany());

        if (getProfileCompany.fulfilled.match(resultAction)) {
        } else {
          const errMsg = (resultAction.payload as string) || "Login failed";
          setApiError(errMsg);
          toast.error(errMsg);
        }
      } else {
        const resultAction = await dispatch(getProfile());

        if (getProfile.fulfilled.match(resultAction)) {
        } else {
          const errMsg = (resultAction.payload as string) || "Login failed";
          setApiError(errMsg);
          toast.error(errMsg);
        }
      }
    };

    fetchProfile();
  }, [dispatch, role]);

  return (
    <>
      <Toaster position="top-center" />
      <Router>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to={role === "admin" ? "/dashboard" : "/"} replace />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to={role === "admin" ? "/dashboard" : "/"} replace />} />
          
          <Route element={<Layout role={role} />}>
            <Route
              element={
                <PrivateRoutes
                  isAuthenticated={isAuthenticated}
                  role={role}
                  allowedRoles={["user"]}
                />
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<Add />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/factories" element={<Factories />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/help" element={<Help />} />
              <Route path="/factories/:id" element={<SingleFactory />} />
              <Route path="/factories/:id/order" element={<PlaceOrder />} />
            </Route>

            <Route
              element={
                <PrivateRoutes
                  isAuthenticated={isAuthenticated}
                  role={role}
                  allowedRoles={["admin"]}
                />
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/products" element={<Products />} />
              <Route path="/dashboard/orders" element={<AdminOrders />} />
              <Route path="/dashboard/delegates" element={<Delegates />} />
              <Route path="/dashboard/help" element={<AdminHelp />} />
              <Route path="/dashboard/account" element={<AdminAccount />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
