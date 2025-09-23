import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Hardwood Flooring",
    description: "Timeless elegance with natural wood beauty",
    features: ["Solid & Engineered", "25+ Wood Species", "Lifetime Warranty"],
    priceRange: "$4.99 - $12.99/sq ft",
    image: "hardwood",
    popular: true,
  },
  {
    id: 2,
    name: "Luxury Vinyl Plank",
    description: "Waterproof durability meets stunning design",
    features: ["100% Waterproof", "Pet Friendly", "DIY Installation"],
    priceRange: "$2.99 - $6.99/sq ft",
    image: "vinyl",
    popular: true,
  },
  {
    id: 3,
    name: "Porcelain & Ceramic Tile",
    description: "Versatile designs for any room",
    features: ["Heat Resistant", "Easy Maintenance", "Endless Styles"],
    priceRange: "$1.99 - $8.99/sq ft",
    image: "tile",
  },
  {
    id: 4,
    name: "Premium Carpet",
    description: "Comfort and warmth underfoot",
    features: ["Stain Resistant", "Sound Absorption", "Soft & Plush"],
    priceRange: "$1.49 - $5.99/sq ft",
    image: "carpet",
  },
  {
    id: 5,
    name: "Laminate Flooring",
    description: "Affordable beauty that lasts",
    features: ["Scratch Resistant", "Easy Install", "Wood Look"],
    priceRange: "$0.99 - $3.99/sq ft",
    image: "laminate",
  },
  {
    id: 6,
    name: "Natural Stone",
    description: "Luxury and durability from nature",
    features: ["Marble & Granite", "Unique Patterns", "Premium Quality"],
    priceRange: "$6.99 - $24.99/sq ft",
    image: "stone",
  },
];

const ProductCategories = () => {
  return (
    <section id="products" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Explore Our Flooring Collections
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From classic hardwood to modern luxury vinyl, find the perfect flooring for your lifestyle and budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative bg-card rounded-lg overflow-hidden shadow-medium hover:shadow-large transition-all duration-300"
            >
              {category.popular && (
                <div className="absolute top-4 right-4 z-10 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  Popular
                </div>
              )}

              {/* Category Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-wood opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-serif text-foreground/10">{category.name[0]}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold text-foreground mb-2">{category.name}</h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>

                <div className="space-y-2 mb-4">
                  {category.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-foreground">{category.priceRange}</span>
                </div>

                <Button variant="premium" className="w-full group">
                  View Collection
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;