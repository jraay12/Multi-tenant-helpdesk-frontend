import { useForm } from "react-hook-form";
import type { LoginUserInput, UserRegisterInput } from "../types";
import { Lock, Eye, EyeOff, Mail, User } from "lucide-react";
import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router";
const RegisterPage = () => {
  const navigate = useNavigate();
  // states
  const [isShowPassword, setShowPassword] = useState<Boolean>(false);

  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: ""
    },
  });

  const onSubmit = async (data: UserRegisterInput) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        navigate("/login")
      },
    });
  };

  const handleViewPassword = () => {
    setShowPassword(!isShowPassword);
  };

  return (
    <main className="flex justify-center h-screen bg-[#e1eafa] px-4 md:px-0">
      <section className=" max-w-md bg-white rounded-2xl shadow-lg p-8 max-h-max mt-4">
        <h1 className="text-xl font-bold text-center mt-2">
          Sign in to WorksyHub
        </h1>

        <p className="text-sm text-gray-500 text-center mt-2 mb-6">
          Enter your credentials to access your workspace and support tools
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Name</label>

            <div className="relative w-full">
              {/* Prefix */}
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />

              <input
                type="text"
                placeholder="John Doe"
                {...register("name", {
                  required: "Name is required",
                  maxLength: {
                    value: 100,
                    message: "Name max character length is 100",
                  }
                })}
                className="border border-gray-200 rounded-lg pl-8 pr-3 py-2 w-full outline-none focus:ring-1 focus:ring-gray-200"
              />
            </div>

            {errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email address</label>

            <div className="relative w-full">
              {/* Prefix */}
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />

              <input
                type="email"
                placeholder="name@company.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                className="border border-gray-200 rounded-lg pl-8 pr-3 py-2 w-full outline-none focus:ring-1 focus:ring-gray-200"
              />
            </div>

            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Password</label>
            </div>

            <div className="relative w-full">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />

              <input
                type={isShowPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="border border-gray-200 rounded-lg pl-9 pr-10 py-2 w-full outline-none focus:ring-1 focus:ring-gray-200"
              />

              {isShowPassword ? (
                <EyeOff
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black cursor-pointer"
                  onClick={handleViewPassword}
                />
              ) : (
                <Eye
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black cursor-pointer"
                  onClick={handleViewPassword}
                />
              )}
            </div>

            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </button>
        </form>
        <div className="text-center flex justify-center mt-4">
          <p className="text-gray-400 font-medium text-xs w-2/3">By clicking "Create Account", you agree to our <span className="text-blue-500">Terms</span> and <span className="text-blue-500">Privacy Policy</span></p>
        </div>
        <div className="w-full border mt-5 border-gray-100"></div>
        <section className="text-center mt-5">
          <p className="text-sm">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Sign In
            </span>
          </p>
        </section>
      </section>
    </main>
  );
};

export default RegisterPage;
