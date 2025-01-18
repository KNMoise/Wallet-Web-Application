import { Button, Input } from "../../components/ui/index";
import { useForm } from "react-hook-form";

export default function LoginPage() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log("Login data:", data);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        type="email"
                        placeholder="Email"
                        {...register("email", { required: true })}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        {...register("password", { required: true })}
                    />
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
                <p className="text-center text-sm text-gray-600">
                    Don't have an account? <a href="/auth/register" className="text-blue-500">Register</a>
                </p>
            </div>
        </div>
    );
}
