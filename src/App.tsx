import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import { Toaster } from "react-hot-toast";
import PrivateRoutes from './utils/privateRoutes';
import SingleFactory from './pages/SingleFactory';
import PlaceOrder from './pages/PlaceOrder';

const NotFound = () => (
  <div className='text-3xl text-red-500 flex items-center justify-center h-screen'>404 - Page Not Found</div>
);

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("user") === "true" ? true : false);
  const [role, setRole] = useState<"user" | "admin">(localStorage.getItem("role") === "admin" ? "admin" : "user");

  console.log(user);
  console.log(role)

  const isAuthenticated = user;

  return (
    <>
      <Toaster position="top-center" />
      <Router>
        <Routes>
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

              <Route path="/factories/factory" element={<SingleFactory />} />
              <Route path="/factories/factory/order" element={<PlaceOrder />} />
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

          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
