import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import TruSaShowcase from "@/components/TruSaShowcase";
import FeaturedProducts from "@/components/FeaturedProducts";
import RoomVisualizer from "@/components/RoomVisualizer";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { ProductDisplay } from "@/components/ProductDisplay";
import { useSnipcart } from "@/components/SnipcartProduct";
import { useEffect, useState } from "react";

const Index = () => {
  const [snipcartKey, setSnipcartKey] = useState<string>("");

  useEffect(() => {
    // Load Snipcart API key from localStorage
    const storedKey = localStorage.getItem("snipcart_api_key");
    if (storedKey) {
      setSnipcartKey(storedKey);
    }
  }, []);

  // Initialize Snipcart if API key is available
  if (snipcartKey) {
    useSnipcart(snipcartKey);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <ProductCategories />
        <TruSaShowcase />
        <ProductDisplay />
        <FeaturedProducts />
        <RoomVisualizer />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;