import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SnipcartProduct } from "./SnipcartProduct";
import { Search, Filter } from "lucide-react";
import { sampleProducts } from "@/utils/sampleProducts";

interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  subcategory?: string;
  description: string;
  price: number;
  salePrice?: number;
  imageUrl?: string;
  inStock: boolean;
  brand?: string;
  material?: string;
  color?: string;
  size?: string;
  features?: string;
}

export function ProductDisplay() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load products from localStorage
    const storedProducts = localStorage.getItem("flooring_products");
    if (storedProducts) {
      const parsed = JSON.parse(storedProducts);
      setProducts(parsed);
      setFilteredProducts(parsed);
    } else {
      // Use sample products if no products in localStorage
      const mappedSampleProducts = sampleProducts.map(p => ({
        id: p.id,
        sku: `SKU-${p.id}`,
        name: p.name,
        category: p.category,
        description: p.description || "",
        price: p.price,
        salePrice: p.salePrice,
        imageUrl: p.imageUrl,
        inStock: p.stockStatus !== "Out of Stock",
        brand: p.brand,
        material: p.material,
        size: p.sqftPerBox ? `${p.sqftPerBox} sq ft/box` : undefined,
        features: p.warranty ? `Warranty: ${p.warranty}` : undefined
      }));
      setProducts(mappedSampleProducts);
      setFilteredProducts(mappedSampleProducts);
      // Save sample products to localStorage for persistence
      localStorage.setItem("flooring_products", JSON.stringify(mappedSampleProducts));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Filter products based on search and filters
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price range filter
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      filtered = filtered.filter(product => {
        const price = product.salePrice || product.price;
        return price >= min && (max ? price <= max : true);
      });
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, priceRange, products]);

  const categories = ["all", ...new Set(products.map(p => p.category))];

  if (loading) {
    return <div className="flex justify-center items-center min-h-[400px]">Loading products...</div>;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No products available</p>
        <p className="text-sm text-muted-foreground">Import products from the admin panel to display them here</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="0-25">Under $25</SelectItem>
              <SelectItem value="25-50">$25 - $50</SelectItem>
              <SelectItem value="50-100">$50 - $100</SelectItem>
              <SelectItem value="100-999999">Over $100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span>Showing {filteredProducts.length} of {products.length} products</span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {product.imageUrl && (
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>
            )}
            
            <CardHeader>
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                {product.salePrice && (
                  <Badge variant="destructive" className="shrink-0">Sale</Badge>
                )}
              </div>
              <CardDescription className="line-clamp-2">
                {product.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-baseline gap-2">
                {product.salePrice ? (
                  <>
                    <span className="text-2xl font-bold text-primary">
                      ${product.salePrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                )}
                <span className="text-sm text-muted-foreground">/sq ft</span>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                {product.brand && (
                  <Badge variant="secondary">{product.brand}</Badge>
                )}
                {product.material && (
                  <Badge variant="outline">{product.material}</Badge>
                )}
                {product.size && (
                  <Badge variant="outline">{product.size}</Badge>
                )}
              </div>

              {!product.inStock && (
                <Badge variant="secondary" className="w-full justify-center">
                  Out of Stock
                </Badge>
              )}
            </CardContent>

            <CardFooter>
              <SnipcartProduct
                id={product.sku}
                name={product.name}
                price={product.salePrice || product.price}
                description={product.description}
                image={product.imageUrl}
                categories={product.category}
                metadata={{
                  brand: product.brand,
                  material: product.material,
                  color: product.color,
                  size: product.size
                }}
                customFields={[
                  {
                    name: "Square Feet",
                    options: "1|10|25|50|100|250|500|1000",
                    required: true
                  }
                ]}
                buttonText={product.inStock ? "Add to Cart" : "Out of Stock"}
                buttonVariant={product.inStock ? "default" : "secondary"}
                className="w-full"
              />
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products match your filters</p>
        </div>
      )}
    </div>
  );
}