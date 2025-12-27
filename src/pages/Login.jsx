import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { motion } from "motion/react";


import bgImage from "../assets/images/login_bg.png"
import logo from "../assets/images/e5logo.png"
import { loginApi } from "../api/auth.api";
import { useAuth } from "../hooks/AuthContext";

function Login() {
    const { login } = useAuth();

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState("");

    useEffect(() => {
        document.title = "Login";
      }, []);


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = async (data) => {

        try {
            setLoginError("");
            const res = await loginApi(data);

            login(res.data.token);

            navigate(
                jwtDecode(res.data.token).role === "ADMIN"
                    ? "/admin/create-form"
                    : "/user/fill-form",
                { replace: true }
            );
        } catch (error) {
            if (error.response?.status === 401) {
                setLoginError("Invalid username or password");
            } else {
                setLoginError("Something went wrong. Please try again.");
            }
        }
    };


    return (
        <div
            className="min-h-screen flex items-center justify-center bg-[#eef6fa]"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md bg-white rounded-xl shadow-xl/30 px-8 py-5"
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, easing: "ease-in-out" }}
            >

                <div className="flex justify-center mb-4">
                    <img src={logo} alt="Logo" className="h-28" />
                </div>

                <div className="mb-2">
                    <input
                        {...register("username", { required: "Enter the Username" })}
                        type="text"
                        placeholder="Your Username"
                        className={`w-full px-4 py-1.5 rounded-sm bg-gray-100 border-2 border-transparent focus:border-gray-200 ${errors.userName ? "focus:border-b-red-500" : "focus:border-b-[#4169e1]"} focus:bg-white focus:outline-none transition delay-150 duration-500 ease-in-out`}
                    />

                    {errors.username && (
                        <p className="text-red-500 text-sm font-medium mt-1">
                            {errors.username.message}
                        </p>
                    )}
                </div>

                <div className="mb-2 relative">
                    <input
                        {...register("password", { required: "Enter the Password" })}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className={`w-full px-4 py-1.5 rounded-sm bg-gray-100 border-2 border-transparent focus:border-gray-200 ${errors.password ? "focus:border-b-red-500" : "focus:border-b-[#4169e1]"} focus:bg-white focus:outline-none transition delay-150 duration-500 ease-in-out`}
                    />

                    {errors.password && (
                        <p className="text-red-500 text-sm font-medium mt-1">
                            {errors.password.message}
                        </p>
                    )}

                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                <div className="text-right mb-3">
                    <p className="text-gray-700 cursor-pointer">
                        Forgot your password ?
                    </p>
                </div>

                {loginError && (
                    <div className="mb-3 text-center">
                        <p className="text-red-500 text-sm font-medium">
                            {loginError}
                        </p>
                    </div>
                )}


                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-18 py-2.5 rounded-md bg-[#4169e1] text-white text-sm font-medium cursor-pointer shadow-lg shadow-[#5fbae966]"
                    >
                        LOGIN
                    </button>
                </div>

            </motion.form>
        </div>
    );
}

export default Login