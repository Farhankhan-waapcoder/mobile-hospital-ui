import { useState, useEffect } from "react";
import { Menu, X, User, LogOut, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("accessToken");
    if (user && token) {
      setIsLoggedIn(true);
      const userData = JSON.parse(user);
      setUserName(userData.name);
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }

    // Update cart count
    const updateCartCount = () => {
      const cart = localStorage.getItem("cart");
      if (cart) {
        const cartItems = JSON.parse(cart);
        setCartCount(cartItems.length);
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();
    // Listen for storage changes
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setUserName("");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "#services", label: "Services", isHash: true },
    { href: "/products", label: "Products", isHash: false },
    { href: "#why-us", label: "Why Us", isHash: true },
    { href: "#locations", label: "Locations", isHash: true },
    { href: "#emi", label: "EMI Plans", isHash: true },
    { href: "#contact", label: "Contact", isHash: true },
  ];

  const handleNavClick = (link: { href: string; isHash: boolean }) => {
    if (link.isHash) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.querySelector(link.href);
          element?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const element = document.querySelector(link.href);
        element?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(link.href);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button onClick={() => navigate("/")} className="flex items-center group">
            <img 
              src="/image.png" 
              alt="Mobile Hospital - We Heal Your Smartphone" 
              className="h-12 lg:h-14 w-auto transition-all duration-300 group-hover:scale-105"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Cart Icon */}
            <button
              onClick={() => navigate("/checkout")}
              className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-background text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {isLoggedIn ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/my-orders")}
                >
                  <User className="mr-2 h-4 w-4" />
                  My Orders
                </Button>
                <Button
                  variant="neon"
                  size="sm"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="neon"
                size="sm"
                onClick={() => navigate("/login")}
              >
                <User className="mr-2 h-4 w-4" />
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link)}
              className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors duration-300 py-2"
            >
              {link.label}
            </button>
          ))}
          
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => {
              navigate("/checkout");
              setIsMobileMenuOpen(false);
            }}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Cart {cartCount > 0 && `(${cartCount})`}
          </Button>

          {isLoggedIn ? (
            <>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  navigate("/my-orders");
                  setIsMobileMenuOpen(false);
                }}
              >
                <User className="mr-2 h-4 w-4" />
                My Orders
              </Button>
              <Button
                variant="hero"
                className="w-full"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="hero"
              className="w-full mt-4"
              onClick={() => {
                navigate("/login");
                setIsMobileMenuOpen(false);
              }}
            >
              <User className="mr-2 h-4 w-4" />
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
