import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const showSignup = () => {
    console.log("Show signup clicked");
  };

  const validateEmail = (email: string) => {
    // regex بسيط للتحقق من الإيميل
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // التحقق من الحقول الفارغة
    if (username.trim() === "") {
      toast.error("Please enter your email.");
      return;
    }

    if (!validateEmail(username.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.trim() === "") {
      toast.error("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    // لو كلشي تمام
    toast.success(`Welcome back`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#86efac] to-white">      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-eco-gray mb-2">🌱 Eco-Revival</h1>
          <p className="text-eco-gray">Sustainable Recycling Platform</p>
        </div>
        <form id="loginForm" onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label className="block text-eco-gray font-medium mb-2">Email</label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86efac] focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-eco-gray font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86efac] focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#86efac] cursor-pointer hover:bg-[#4ade80] text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-6 text-eco-gray">
          Don't have an account?{" "}
          <Link
            to="/register"
            onClick={showSignup}
            className="text-[#4ade80] cursor-pointer hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
