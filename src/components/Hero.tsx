import { Button } from "@/components/ui/button";
import { ArrowRight, Star, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-flooring.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-subtle">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,_hsl(var(--wood-light))_0%,_transparent_100%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent text-accent" />
              ))}
              <span className="text-sm text-muted-foreground ml-2">4.9/5 (2,847 Reviews)</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-accent" />
              <span>Trusted by 50,000+ Canadian Homes</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 leading-tight">
            Transform Your Space with
            <span className="block text-transparent bg-clip-text bg-gradient-hero mt-2">
              Premium Flooring
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover exceptional quality hardwood, tile, vinyl, and carpet flooring. 
            Professional installation and lifetime warranty available.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="hero" size="lg" className="text-lg px-8 py-6">
              Browse Collections
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Book Free Consultation
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-lg shadow-soft border border-border">
              <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
              <p className="text-muted-foreground text-sm">On orders over $500 across Canada</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-soft border border-border">
              <h3 className="font-semibold text-lg mb-2">Expert Installation</h3>
              <p className="text-muted-foreground text-sm">Professional certified installers</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-soft border border-border">
              <h3 className="font-semibold text-lg mb-2">Lifetime Warranty</h3>
              <p className="text-muted-foreground text-sm">Industry-leading protection plans</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;