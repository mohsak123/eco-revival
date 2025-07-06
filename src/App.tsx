import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import { Toaster } from "react-hot-toast";
import Register from './pages/auth/Register';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Factories from './pages/Factories';
import Profile from './pages/Profile';
import Help from './pages/Help';
import Add from './pages/Add';

const NotFound = () => (
  <div className='text-3xl text-red-500'>404 - Page Not Found</div>
);

// المكون الرئيسي
const App = () => {
  const [user, setUser] = useState(true);

  return (
    <>
      <Toaster position="top-center" />

      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/add"
              element={user ? <Add /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/orders"
              element={user ? <Orders /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/factories"
              element={user ? <Factories /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/help"
              element={user ? <Help /> : <Navigate to="/login" replace />}
            />
          </Route>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" replace />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
