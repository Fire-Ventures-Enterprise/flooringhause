import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import TruSaShowcase from "@/components/TruSaShowcase";
import FeaturedProducts from "@/components/FeaturedProducts";
import RoomVisualizer from "@/components/RoomVisualizer";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <ProductCategories />
        <TruSaShowcase />
        <FeaturedProducts />
        <RoomVisualizer />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;