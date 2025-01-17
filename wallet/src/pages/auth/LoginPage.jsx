import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData(e.target);
      console.log("Login attempt:", {
        email: formData.get("email"),
        password: formData.get("password"),
      });
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError("Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[400px]">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center" Link to="/dashboard">
            
            <Link to="/dashboard" className="text-blue-300 hover:text-blue-700">
              LOGIN
            </Link>
          </h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input name="email" type="email" placeholder="Email" required />
            </div>
            <div className="space-y-2">
              <Input
                name="password"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </Button>
            <div className="text-center">
              <Link
                to="/register"
                className="text-blue-500 hover:text-blue-600"
              >
                Need an account? Register
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
