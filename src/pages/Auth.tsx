import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

const handleSignup = (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const userExists = users.find((u: any) => u.email === email);

  if (userExists) {
    toast({
      title: "User already exists",
      description: "Please login instead",
      variant: "destructive",
    });
    setLoading(false);
    return;
  }

  const newUser = {
    fullName,
    email,
    password,
  };

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  toast({
    title: "Account created!",
    description: "Now login with your credentials",
  });

  setLoading(false);
  navigate("/login");
};

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <form
        className="max-w-md mx-auto h-[80vh] flex flex-col items-center justify-center px-4"
        onSubmit={handleSignup}
      >
        <h1 className="my-10 text-5xl text-center font-dm-serif text-foreground">Create An Account</h1>
        <div className="mb-5 w-full">
          <label htmlFor="email" className="block mb-2 text-lg font-medium text-foreground">
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-muted border border-input text-foreground text-sm rounded-lg focus:ring-2 focus:ring-primary focus:border-primary block w-full p-2.5"
            placeholder="name@domain.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5 w-full">
          <label htmlFor="name" className="block mb-2 text-lg font-medium text-foreground">
            Your name
          </label>
          <input
            type="text"
            id="name"
            className="bg-muted border border-input text-foreground text-sm rounded-lg focus:ring-2 focus:ring-primary focus:border-primary block w-full p-2.5"
            placeholder="e.g. Rahul Sharma"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="mb-5 w-full">
          <label htmlFor="password" className="block mb-2 text-lg font-medium text-foreground">
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-muted border border-input text-foreground text-sm rounded-lg focus:ring-2 focus:ring-primary focus:border-primary block w-full p-2.5"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="text-lg w-full sm:w-auto px-5 py-2.5" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Auth;
