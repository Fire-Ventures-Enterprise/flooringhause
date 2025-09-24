import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShoppingCart, AlertCircle, CheckCircle, DollarSign, Package, CreditCard } from "lucide-react";
import { SnipcartProduct, useSnipcart } from "@/components/SnipcartProduct";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SnipcartIntegration() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('snipcartApiKey') || '');
  const [isConfigured, setIsConfigured] = useState(!!apiKey);
  
  // Initialize Snipcart if API key exists
  useSnipcart(apiKey);

  const handleSaveConfig = () => {
    if (apiKey) {
      localStorage.setItem('snipcartApiKey', apiKey);
      setIsConfigured(true);
      // Reload page to initialize Snipcart with new key
      window.location.reload();
    }
  };

  // Example flooring products
  const exampleProducts = [
    {
      id: "lvp-oak-001",
      name: "Luxury Vinyl Plank - Oak Heritage",
      price: 4.99,
      description: "Waterproof luxury vinyl plank with realistic oak texture",
      image: "/placeholder.svg",
      categories: "flooring,vinyl,waterproof",
      customFields: [
        {
          name: "Installation",
          options: "DIY|Professional (+$2.50/sqft)",
        }
      ]
    },
    {
      id: "tile-marble-002",
      name: "Porcelain Tile - Carrara Marble Look",
      price: 8.99,
      description: "24x24 porcelain tile with authentic marble veining",
      image: "/placeholder.svg",
      categories: "flooring,tile,porcelain",
      customFields: [
        {
          name: "Finish",
          options: "Polished|Matte|Textured",
        }
      ]
    },
    {
      id: "carpet-berber-003",
      name: "Premium Berber Carpet",
      price: 2.99,
      description: "Stain-resistant loop pile carpet, 12ft width",
      image: "/placeholder.svg",
      categories: "flooring,carpet",
      customFields: [
        {
          name: "Padding",
          options: "Standard|Premium (+$0.50/sqft)|Memory Foam (+$0.75/sqft)",
        }
      ]
    }
  ];

  const features = [
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: "Simple Pricing",
      description: "2% transaction fee or $20/month minimum"
    },
    {
      icon: <Package className="h-5 w-5" />,
      title: "Inventory Management",
      description: "Track stock levels and variants"
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      title: "Multiple Payment Methods",
      description: "Accept cards, PayPal, and more"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Snipcart E-commerce Integration
          </CardTitle>
          <CardDescription>
            Add a powerful shopping cart to your flooring website with Snipcart - simpler and more affordable than Shopify
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Features */}
          <div className="grid md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-3">
                <div className="text-primary">{feature.icon}</div>
                <div>
                  <h4 className="font-semibold text-sm">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Setup Section */}
          {!isConfigured ? (
            <>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Quick Setup Required</AlertTitle>
                <AlertDescription>
                  <ol className="list-decimal ml-4 mt-2 space-y-1">
                    <li>Sign up for free at <a href="https://snipcart.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">snipcart.com</a></li>
                    <li>Get your Public API Key from the dashboard</li>
                    <li>Enter it below to activate the shopping cart</li>
                  </ol>
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="apiKey">Snipcart Public API Key</Label>
                  <Input
                    id="apiKey"
                    placeholder="YOUR_PUBLIC_API_KEY"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Find this in your Snipcart Dashboard → API Keys
                  </p>
                </div>

                <Button onClick={handleSaveConfig} className="w-full">
                  Activate Snipcart
                </Button>
              </div>
            </>
          ) : (
            <>
              <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle>Snipcart Activated</AlertTitle>
                <AlertDescription>
                  Your shopping cart is ready! Try the example products below.
                </AlertDescription>
              </Alert>

              <Button 
                variant="outline" 
                onClick={() => {
                  setApiKey('');
                  setIsConfigured(false);
                  localStorage.removeItem('snipcartApiKey');
                }}
              >
                Reset Configuration
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {isConfigured && (
        <Card>
          <CardHeader>
            <CardTitle>Try Example Products</CardTitle>
            <CardDescription>
              Test the shopping cart with these sample flooring products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="code">Integration Code</TabsTrigger>
              </TabsList>
              
              <TabsContent value="products" className="mt-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {exampleProducts.map((product) => (
                    <Card key={product.id}>
                      <div className="aspect-square bg-gradient-to-br from-muted to-muted-foreground/10 rounded-t-lg"></div>
                      <CardContent className="pt-4">
                        <h3 className="font-semibold mb-2">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-bold">${product.price}</span>
                          <span className="text-sm text-muted-foreground">/sq ft</span>
                        </div>
                        <SnipcartProduct
                          {...product}
                          buttonText="Add to Cart"
                          className="w-full"
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="code" className="mt-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">How to Add Products</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Use the SnipcartProduct component anywhere in your app:
                    </p>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`import { SnipcartProduct } from "@/components/SnipcartProduct";

<SnipcartProduct
  id="unique-product-id"
  name="Product Name"
  price={9.99}
  description="Product description"
  image="/product-image.jpg"
  categories="category1,category2"
  customFields={[
    {
      name: "Size",
      options: "Small|Medium|Large",
      required: true
    }
  ]}
  buttonText="Add to Cart"
/>`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Custom Fields for Flooring</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Perfect for flooring options like installation, padding, or finish:
                    </p>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`customFields={[
  {
    name: "Installation",
    options: "DIY|Professional (+$3/sqft)"
  },
  {
    name: "Room Size (sq ft)",
    options: "100|200|300|400|500|Custom",
    required: true
  }
]}`}
                    </pre>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}