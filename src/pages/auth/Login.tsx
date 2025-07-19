import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, loginCompany, setRole } from "@/store/authSlice";
import type { AppDispatch } from "@/store/store";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

// 1. تعريف schema باستخدام zod
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const [isCompany, setIsCompany] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  // دالة التنفيذ عند submit
  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setApiError(null);

    try {
      if (isCompany) {
        const resultAction = await dispatch(
          loginCompany({
            username: data.username.trim(),
            password: data.password.trim(),
            isCompany,
          })
        );

        if (loginCompany.fulfilled.match(resultAction)) {
          dispatch(setRole("admin"));
          toast.success("Welcome back, Company!");
          navigate("/dashboard");
        } else {
          // الخطأ في reject
          const errMsg = (resultAction.payload as string) || "Login failed";
          setApiError(errMsg);
          toast.error(errMsg);
        }
      } else {
        const resultAction = await dispatch(
          loginUser({
            username: data.username.trim(),
            password: data.password.trim(),
            isCompany,
          })
        );

        if (loginUser.fulfilled.match(resultAction)) {
          dispatch(setRole("user"));
          toast.success("Welcome back!");
          navigate("/");
        } else {
          const errMsg = (resultAction.payload as string) || "Login failed";
          setApiError(errMsg);
          toast.error(errMsg);
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#86efac] to-white">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-eco-gray mb-2 flex items-center justify-center gap-1">
            <img src="/images/logo.jpg" alt="" className="w-[70px] h-[70px] object-cover" />
            {t('app_name')}
          </h1>
          <p className="text-eco-gray">{t('app_desc')}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <div>
            <label className="block text-eco-gray font-medium mb-2">{t('username')}</label>
            <input
              type="text"
              {...register("username")}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86efac] focus:border-transparent
                ${errors.username ? "border-red-500 focus:ring-red-500" : ""}
              `}
              placeholder={t('username')}
              disabled={loading}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-eco-gray font-medium mb-2">{t('password')}</label>
            <input
              type="password"
              {...register("password")}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86efac] focus:border-transparent
                ${errors.password ? "border-red-500 focus:ring-red-500" : ""}
              `}
              placeholder={t('password')}
              disabled={loading}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

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
              {t('company_name')}
            </label>
          </div>

          <button
            type="submit"
            className="w-full hover:bg-[#86efac] cursor-pointer bg-[#4ade80] text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : t('login')}
          </button>
        </form>

        <p className="text-center mt-6 text-eco-gray">
          {t('no_account')}{" "}
          <Link
            to="/register"
            className="text-[#4ade80] cursor-pointer hover:underline font-medium"
          >
            {t('signup')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
