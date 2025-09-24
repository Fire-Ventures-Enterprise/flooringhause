import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "SPC Vinyl Planks",
    description: "Ultimate durability with stone polymer core technology",
    features: ["100% Waterproof", "Stone Polymer Core", "Commercial Grade", "Pet & Kid Friendly"],
    image: "spc",
    popular: true,
    new: true,
  },
  {
    id: 2,
    name: "Laminate Flooring",
    description: "Beautiful wood-look flooring with exceptional value",
    features: ["AC4/AC5 Rated", "Scratch Resistant", "Easy Click Installation", "Wide Plank Options"],
    image: "laminate",
    popular: true,
  },
  {
    id: 3,
    name: "Luxury Vinyl Plank (LVP)",
    description: "Premium waterproof flooring with realistic textures",
    features: ["Waterproof Core", "Embossed Textures", "Sound Reduction", "DIY Friendly"],
    image: "lvp",
  },
  {
    id: 5,
    name: "Porcelain & Ceramic Tile",
    description: "Versatile designs from classic to contemporary",
    features: ["Wood Look Tiles", "Large Format", "Indoor/Outdoor", "Easy Maintenance"],
    image: "tile",
  },
  {
    id: 6,
    name: "WPC Vinyl Flooring",
    description: "Wood Plastic Composite for superior stability",
    features: ["Waterproof", "Dimensional Stability", "Quiet Underfoot", "Temperature Resistant"],
    image: "wpc",
  },
  {
    id: 7,
    name: "Natural Stone",
    description: "Premium marble, granite, and travertine",
    features: ["Unique Patterns", "Lifetime Durability", "Heat Resistant", "Adds Property Value"],
    image: "stone",
  },
  {
    id: 8,
    name: "Hybrid Flooring",
    description: "Next-gen flooring combining best technologies",
    features: ["Rigid Core", "Ultra Stable", "Acoustic Backing", "Lifetime Warranty"],
    image: "hybrid",
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
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                {category.popular && (
                  <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    Popular
                  </div>
                )}
                {category.new && (
                  <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    New
                  </div>
                )}
              </div>

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

                <div className="space-y-2 mb-6">
                  {category.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                      {feature}
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full group">
                  View Collection
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="minimal" size="lg">
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;