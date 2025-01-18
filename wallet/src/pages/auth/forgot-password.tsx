import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";

export default function ForgotPasswordPage() {
    // Initialize form with defaultValues to ensure the field is properly tracked
    const { register, handleSubmit, formState: { errors, isSubmitting: formIsSubmitting } } = useForm({
        defaultValues: {
            email: ''
        }
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async (data:any) => {
        try {
            setError('');
            setIsSubmitting(true);
            // Simulating API call - replace with your actual API integration
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log("Forgot Password data:", data);
            setIsEmailSent(true);
        } catch (error) {
            console.error("Error sending reset email:", error);
            setError('Failed to send reset email. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />

            {/* Glassmorphism Card */}
            <div className="relative w-full max-w-md p-8 mx-4 rounded-xl backdrop-blur-md bg-white/20 shadow-2xl border border-white/30">
                {/* Icon */}
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
                            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" 
                        />
                    </svg>
                </div>

                {!isEmailSent ? (
                    <>
                        <h1 className="text-3xl font-bold text-center text-white mb-4">
                            Forgot Password?
                        </h1>
                        <p className="text-center text-white/80 mb-8">
                            No worries! Enter your email address below, and we'll send you instructions to reset your password.
                        </p>

                        {error && (
                            <Alert variant="destructive" className="mb-6 bg-red-500/10 text-red-200 border-red-500/30">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <Input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="w-full px-4 py-3 rounded-lg bg-white/10 border-white/20 text-white placeholder-white/60 backdrop-blur-sm focus:bg-white/20 focus:border-white transition"
                                    {...register("email", { 
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Please enter a valid email address"
                                        }
                                    })}
                                    aria-invalid={errors.email ? "true" : "false"}
                                    disabled={isSubmitting}
                                />
                                {errors.email && (
                                    <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            <Button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm transition-all duration-200 border border-white/30 hover:border-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </span>
                                ) : "Send Reset Link"}
                            </Button>
                        </form>
                    </>
                ) : (
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white">Check Your Email</h2>
                        <p className="text-white/80">
                            We've sent password reset instructions to your email address. Please check your inbox.
                        </p>
                    </div>
                )}

                <div className="mt-6 text-center">
                    <p className="text-white/80">
                        Remembered your password?{" "}
                        <a 
                            href="/auth/login" 
                            className="text-white hover:text-white/90 underline underline-offset-2"
                        >
                            Back to Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}