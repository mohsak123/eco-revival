import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCompany, setIsCompany] = useState(false); // حالة الـ checkbox
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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

    console.log("Is Company:", isCompany);

    setLoading(true);

    setTimeout(() => {
      toast.success(`Welcome back!`);
      localStorage.setItem("user", "true");
      if (isCompany) {
        localStorage.setItem("role", "admin");
        navigate("/dashboard");
      } else {
        localStorage.setItem("role", "user");
        navigate("/");
      }
      setLoading(false);
    }, 1000);

    setTimeout(()=>{
      location.reload();

    },1500)

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#86efac] to-white">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md fade-in">
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          {/* checkbox WeAreCompany */}
          <div className="flex items-center space-x-2">
            <input
              id="weAreCompany"
              type="checkbox"
              checked={isCompany}
              onChange={(e) => setIsCompany(e.target.checked)}
              className="w-5 h-5 text-[#4ade80] border-gray-300 rounded focus:ring-[#4ade80]"
              disabled={loading}
            />
            <label htmlFor="weAreCompany" className="text-eco-gray font-medium cursor-pointer select-none">
              WeAreCompany
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#86efac] cursor-pointer hover:bg-[#4ade80] text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-6 text-eco-gray">
          Don't have an account?{" "}
          <Link
            to="/register"
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
