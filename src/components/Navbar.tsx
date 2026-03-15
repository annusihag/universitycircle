import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Store", href: "/marketplace" },
  { label: "Campus Map", href: "/map" },
  { label: "Chatbot", href: "/chatbot" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    setCurrentUser(user);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="font-josefin text-3xl font-semibold text-foreground">
            UniCircle
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <Button
                variant={location.pathname === item.href ? "secondary" : "ghost"}
                size="sm"
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {currentUser ? (
            <>
              <span className="text-sm">👤 {currentUser.fullName}</span>
              <Button variant="destructive" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-1" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button size="sm">Login</Button>
              </Link>
              <Link to="/auth">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>

      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background p-4 space-y-2">

          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
            >
              <Button
                variant={location.pathname === item.href ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                {item.label}
              </Button>
            </Link>
          ))}

          {/* Mobile Auth Buttons */}
          <div className="flex flex-col gap-2 pt-3">

            {currentUser ? (
              <>
                <span className="text-sm">👤 {currentUser.fullName}</span>

                <Button
                  variant="destructive"
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full">Login</Button>
                </Link>

                <Link to="/auth" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </>
            )}

          </div>

        </div>
      )}
    </nav>
  );
};

export default Navbar;