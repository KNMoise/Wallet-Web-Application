import { useNavigate } from "react-router-dom";
import { Button, Input } from "../../components/ui/index";
import { useForm } from "react-hook-form";


export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data: any) => {
        console.log("Login data:", data);
        navigate("/dashboard");
    };
    

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            {/* Background Image */}
            <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('https://img.freepik.com/premium-photo/self-created-chart-high-angle-view-financial-chart-office-desk_1048944-18018368.jpg?ga=GA1.1.1104074881.1734959475&semt=ais_hybrid')`,
                    backgroundBlendMode: 'overlay',
                }}
            >
                {/* Overlay for better text visibility */}
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Glassmorphism Card */}
            <div className="relative w-full max-w-md p-8 mx-4 rounded-xl backdrop-blur-md bg-white/20 shadow-2xl border border-white/30">
                {/* Logo or Icon placeholder */}
                <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                    <svg 
                        className="w-12 h-12 text-white" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                        />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-center text-white mb-8">Welcome Back</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border-white/20 text-white placeholder-white/60 backdrop-blur-sm focus:bg-white/20 focus:border-white transition"
                            {...register("email", { 
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-300 text-sm">{errors.email?.message as string}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border-white/20 text-white placeholder-white/60 backdrop-blur-sm focus:bg-white/20 focus:border-white transition"
                            {...register("password", { 
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-300 text-sm">{errors.password.message as string}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center text-white/80">
                            <input type="checkbox" className="mr-2" />
                            Remember me
                        </label>
                        <a href="/auth/forgot-password" className="text-white/80 hover:text-white">
                            Forgot Password?
                        </a>
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm transition-all duration-200 border border-white/30 hover:border-white/50"
                    >
                        Sign In
                    </Button>
                </form>

                <p className="mt-6 text-center text-white/80">
                    Don't have an account?{' '}
                    <a 
                        href="/auth/register" 
                        className="text-white hover:text-white/90 underline underline-offset-2"
                    >
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}
