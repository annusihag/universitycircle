import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

interface User {
fullName: string;
email: string;
password: string;
}

const Login = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [suggestions, setSuggestions] = useState<string[]>([]);
const [loading, setLoading] = useState(false);

const navigate = useNavigate();
const { toast } = useToast();

// redirect if already logged in
useEffect(() => {
const currentUser = localStorage.getItem("currentUser");
if (currentUser) {
navigate("/marketplace");
}
}, [navigate]);

// handle email suggestions
const handleEmailChange = (value: string) => {
setEmail(value);


const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

if (!value) {
  setSuggestions([]);
  return;
}

const filtered = users
  .map((u) => u.email)
  .filter((mail) =>
    mail.toLowerCase().includes(value.toLowerCase())
  );

setSuggestions(filtered);


};

const handleLogin = (e: React.FormEvent) => {
e.preventDefault();
setLoading(true);


const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

const user = users.find(
  (u) => u.email === email && u.password === password
);

if (!user) {
  toast({
    title: "Login Failed",
    description: "Invalid email or password",
    variant: "destructive",
  });

  setLoading(false);
  return;
}

// save logged user
localStorage.setItem("currentUser", JSON.stringify(user));

toast({
  title: "Login Successful",
  description: `Welcome back ${user.fullName}!`,
});

setLoading(false);

navigate("/marketplace");

// refresh navbar
window.location.reload();


};

return ( <div className="min-h-screen bg-background"> <Navbar />


  <form
    className="max-w-md mx-auto h-[80vh] flex flex-col items-center justify-center px-4"
    onSubmit={handleLogin}
  >
    <h1 className="my-10 text-5xl text-center font-dm-serif text-foreground">
      Login To UniCircle
    </h1>

    <div className="mb-5 w-full relative">
      <label className="block mb-2 text-lg font-medium text-foreground">
        Your email
      </label>

      <input
        type="email"
        className="bg-muted border border-input text-foreground text-sm rounded-lg focus:ring-2 focus:ring-primary block w-full p-2.5"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(e) => handleEmailChange(e.target.value)}
      />

      {suggestions.length > 0 && (
        <div className="absolute w-full bg-white border rounded-md shadow mt-1 z-10">
          {suggestions.map((s) => (
            <div
              key={s}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setEmail(s);
                setSuggestions([]);
              }}
            >
              {s}
            </div>
          ))}
        </div>
      )}
    </div>

    <div className="mb-5 w-full">
  <label
    htmlFor="password"
    className="block mb-2 text-lg font-medium text-foreground"
  >
    Your password
  </label>

  <input
    id="password"
    type="password"
    className="bg-muted border border-input text-foreground text-sm rounded-lg focus:ring-2 focus:ring-primary focus:border-primary block w-full p-2.5"
    placeholder="Enter your password"
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
</div>

    <Button
      type="submit"
      className="text-lg w-full sm:w-auto px-5 py-2.5"
      disabled={loading}
    >
      {loading ? "Logging in..." : "Login"}
    </Button>

    <p className="mt-4 text-sm text-muted-foreground">
      Don't have an account?{" "}
      <Link to="/auth" className="text-primary hover:underline">
        Sign up
      </Link>
    </p>
  </form>
</div>


);
};

export default Login;
