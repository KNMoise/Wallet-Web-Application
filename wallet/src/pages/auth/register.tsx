import { Button, Input } from "../../components/ui/index";
import { useForm } from "react-hook-form";



export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const password = watch("password", "");

    const onSubmit = (data: any) => {
        console.log("Register data:", data);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            {/* Background Image - using the same background as login for consistency */}
            <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('https://img.freepik.com/free-photo/unhappy-depressed-young-african-american-couple-calculating-family-budget_273609-9212.jpg?ga=GA1.1.1104074881.1734959475&semt=ais_hybrid')`,
                    backgroundBlendMode: 'overlay',
                }}
            >
                {/* Overlay for better text visibility */}
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Glassmorphism Card */}
            <div className="relative w-full max-w-md p-8 mx-4 rounded-xl backdrop-blur-md bg-white/20 shadow-2xl border border-white/30">
                {/* Registration Icon */}
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
                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" 
                        />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-center text-white mb-8">Create Account</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name Input */}
                    <div className="space-y-2">
                        <Input
                            type="text"
                            placeholder="Full Name"
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border-white/20 text-white placeholder-white/60 backdrop-blur-sm focus:bg-white/20 focus:border-white transition"
                            {...register("name", { 
                                required: "Name is required",
                                minLength: {
                                    value: 2,
                                    message: "Name must be at least 2 characters"
                                }
                            })}
                        />
                        {errors.name && (
                            <p className="text-red-300 text-sm">{errors.name?.message as string}</p>
                        )}
                    </div>

                    {/* Email Input */}
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

                    {/* Password Input */}
                    <div className="space-y-2">
                        <Input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border-white/20 text-white placeholder-white/60 backdrop-blur-sm focus:bg-white/20 focus:border-white transition"
                            {...register("password", { 
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters"
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                    message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                                }
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-300 text-sm">{errors.password?.message as string}</p>
                        )}
                    </div>

                    {/* Confirm Password Input */}
                    <div className="space-y-2">
                        <Input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border-white/20 text-white placeholder-white/60 backdrop-blur-sm focus:bg-white/20 focus:border-white transition"
                            {...register("confirmPassword", { 
                                required: "Please confirm your password",
                                validate: value => 
                                    value === password || "Passwords do not match"
                            })}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-300 text-sm">{errors.confirmPassword?.message as string}</p>
                        )}
                    </div>

                    {/* Terms and Conditions Checkbox */}
                    <div className="flex items-center space-x-2 text-white/80">
                        <input 
                            type="checkbox" 
                            {...register("terms", { 
                                required: "You must accept the terms and conditions" 
                            })}
                            className="rounded border-white/20 bg-white/10 text-blue-500"
                        />
                        <label className="text-sm">
                            I agree to the Terms and Conditions
                        </label>
                    </div>
                    {errors.terms && (
                        <p className="text-red-300 text-sm">{errors.terms?.message as string}</p>
                    )}

                    <Button 
                        type="submit" 
                        className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm transition-all duration-200 border border-white/30 hover:border-white/50"
                    >
                        Create Account
                    </Button>
                </form>

                <p className="mt-6 text-center text-white/80">
                    Already have an account?{' '}
                    <a 
                        href="/auth/login" 
                        className="text-white hover:text-white/90 underline underline-offset-2"
                    >
                        Sign In
                    </a>
                </p>
            </div>
        </div>
    );
}
