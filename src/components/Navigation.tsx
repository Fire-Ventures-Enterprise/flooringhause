import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, ShoppingCart, Phone } from "lucide-react";
import { SnipcartCartSummary } from "@/components/SnipcartProduct";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Products", href: "#products" },
    { name: "Collections", href: "#collections" },
    { name: "Room Visualizer", href: "#visualizer" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md z-50 border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="hidden md:flex items-center justify-between py-2 text-sm border-b border-border">
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-2">
              <Phone className="h-3 w-3" />
              1-800-FLOORING
            </span>
            <span>Free Consultation Available</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/samples" className="text-muted-foreground hover:text-foreground transition-colors">
              Order Samples
            </Link>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center">
            <img 
              src={logoDark} 
              alt="FlooringHause" 
              className="h-20 w-auto dark:hidden"
            />
            <img 
              src={logoLight} 
              alt="FlooringHause" 
              className="h-20 w-auto hidden dark:block"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground/80 hover:text-foreground font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <SnipcartCartSummary />
            <Button variant="minimal">Get Quote</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-foreground/80 hover:text-foreground font-medium transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex gap-3 pt-3 border-t border-border">
                <Button variant="outline" className="flex-1">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button variant="minimal" className="flex-1">Get Quote</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;