import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import logoLight from "@/assets/logo-light.png";

const Footer = () => {
  return (
    <footer className="bg-wood-dark text-warm-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-wood py-12 border-b border-wood-light/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-serif font-bold mb-4">
              Get 10% Off Your First Order
            </h3>
            <p className="text-warm-white/80 mb-6">
              Subscribe to our newsletter for exclusive deals, design tips, and new product launches
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-warm-white/10 border-warm-white/20 text-warm-white placeholder:text-warm-white/60"
              />
              <Button variant="accent">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <img 
                  src={logoLight} 
                  alt="FlooringHause" 
                  className="h-14 w-auto mb-4"
                />
                <p className="text-warm-white/80">
                  Premium flooring solutions for Canadian homes. Quality, service, and style since 2009.
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span className="text-warm-white/80">123 Flooring Ave, Toronto, ON M5V 3A8</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-accent" />
                  <span className="text-warm-white/80">1-800-FLOORING</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-accent" />
                  <span className="text-warm-white/80">info@flooringhause.com</span>
                </div>
              </div>

              <div className="flex gap-4">
                <a href="#" className="h-10 w-10 bg-warm-white/10 rounded-full flex items-center justify-center hover:bg-warm-white/20 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 bg-warm-white/10 rounded-full flex items-center justify-center hover:bg-warm-white/20 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 bg-warm-white/10 rounded-full flex items-center justify-center hover:bg-warm-white/20 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 bg-warm-white/10 rounded-full flex items-center justify-center hover:bg-warm-white/20 transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Products</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-warm-white/80 hover:text-warm-white transition-colors">Hardwood Flooring</a></li>
                <li><a href="#" className="text-warm-white/80 hover:text-warm-white transition-colors">Luxury Vinyl</a></li>
                <li><a href="#" className="text-warm-white/80 hover:text-warm-white transition-colors">Tile & Stone</a></li>
                <li><a href="#" className="text-warm-white/80 hover:text-warm-white transition-colors">Carpet</a></li>
                <li><a href="#" className="text-warm-white/80 hover:text-warm-white transition-colors">Laminate</a></li>
                <li><a href="#" className="text-warm-white/80 hover:text-warm-white transition-colors">Accessories</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-warm-white/80 hover:text-warm-white transition-colors">Installation</a></li>
                <li><a href="#" className="text-warm-white/80 hover:text-warm-white transition-colors">Room Visualizer</a></li>
                <li><a href="#" className="text-warm-white/80 hover:text-warm-white transition-colors">Free Samples</a></li>
                <li><a href="#" className="text-warm-white/80 hover:text-warm-white transition-colors">Consultation</a></li>
                <li><a href="#" className="text-warm-white/80 hover:text-warm-white transition-colors">Warranty</a></li>
                <li><a href="#" className="text-warm-white/80 hover:text-warm-white transition-colors">Financing</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-warm-white/80 hover:text-warm-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-warm-white/80 hover:text-warm-white transition-colors">FAQs</a></li>
                <li><a href="#" className="text-warm-white/80 hover:text-warm-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="text-warm-white/80 hover:text-warm-white transition-colors">Returns</a></li>
                <li><a href="#" className="text-warm-white/80 hover:text-warm-white transition-colors">Care & Maintenance</a></li>
                <li><a href="#" className="text-warm-white/80 hover:text-warm-white transition-colors">Installation Guide</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-wood-light/20 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-warm-white/60 text-sm">
              © 2024 FlooringHause. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-warm-white/60 hover:text-warm-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-warm-white/60 hover:text-warm-white transition-colors">Terms of Service</a>
              <a href="#" className="text-warm-white/60 hover:text-warm-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;