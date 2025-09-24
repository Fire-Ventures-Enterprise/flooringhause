import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Eye, Heart } from "lucide-react";

const products = {
  trending: [
    {
      id: 1,
      name: "Oak Heritage Wide Plank",
      category: "Hardwood", 
      price: "$8.99",
      originalPrice: "$10.99",
      unit: "sq ft",
      sale: true,
      rating: 4.8,
      reviews: 234,
      shopifyProductId: "7857989632173", // Add your actual Shopify product ID
    },
    {
      id: 2,
      name: "Carrara Marble Tile 24x24",
      category: "Natural Stone",
      price: "$14.99",
      unit: "sq ft",
      new: true,
      rating: 4.9,
      reviews: 89,
    },
    {
      id: 3,
      name: "Waterproof Oak LVP",
      category: "Luxury Vinyl",
      price: "$4.49",
      unit: "sq ft",
      bestseller: true,
      rating: 4.7,
      reviews: 567,
    },
    {
      id: 4,
      name: "Plush Berber Carpet",
      category: "Carpet",
      price: "$2.99",
      unit: "sq ft",
      rating: 4.6,
      reviews: 123,
    },
  ],
  sale: [
    {
      id: 5,
      name: "Walnut Engineered Hardwood",
      category: "Hardwood",
      price: "$6.99",
      originalPrice: "$9.99",
      unit: "sq ft",
      sale: true,
      rating: 4.8,
      reviews: 345,
    },
    {
      id: 6,
      name: "Gray Slate Tile 12x12",
      category: "Tile",
      price: "$2.49",
      originalPrice: "$3.99",
      unit: "sq ft",
      sale: true,
      rating: 4.5,
      reviews: 234,
    },
  ],
  new: [
    {
      id: 7,
      name: "Bamboo Natural Flooring",
      category: "Hardwood",
      price: "$5.99",
      unit: "sq ft",
      new: true,
      eco: true,
      rating: 4.9,
      reviews: 45,
    },
    {
      id: 8,
      name: "Hexagon Mosaic Tile",
      category: "Tile",
      price: "$7.99",
      unit: "sq ft",
      new: true,
      rating: 4.7,
      reviews: 23,
    },
  ],
};

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState("trending");

  return (
    <section id="featured" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our hand-picked selection of premium flooring options
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="sale">On Sale</TabsTrigger>
            <TabsTrigger value="new">New Arrivals</TabsTrigger>
          </TabsList>

          {Object.entries(products).map(([key, items]) => (
            <TabsContent key={key} value={key} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-large transition-all duration-300"
                  >
                    {/* Product Image Placeholder */}
                    <div className="relative h-64 bg-gradient-to-br from-warm-beige to-muted overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-wood opacity-10"></div>
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.sale && (
                          <Badge className="bg-destructive text-destructive-foreground">
                            SALE
                          </Badge>
                        )}
                        {product.new && (
                          <Badge className="bg-accent text-accent-foreground">
                            NEW
                          </Badge>
                        )}
                        {product.bestseller && (
                          <Badge className="bg-primary text-primary-foreground">
                            BESTSELLER
                          </Badge>
                        )}
                        {product.eco && (
                          <Badge className="bg-green-600 text-white">
                            ECO
                          </Badge>
                        )}
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <Button variant="secondary" size="icon" className="rounded-full">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" size="icon" className="rounded-full">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="minimal" size="icon" className="rounded-full">
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                      <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-1">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? "text-accent fill-accent"
                                  : "text-muted fill-muted"
                              }`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-foreground">{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.originalPrice}
                          </span>
                        )}
                        <span className="text-sm text-muted-foreground">/{product.unit}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturedProducts;