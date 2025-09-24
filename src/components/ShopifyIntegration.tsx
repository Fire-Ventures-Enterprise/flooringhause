import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShoppingCart, AlertCircle, CheckCircle } from "lucide-react";
import { ShopifyProduct } from "./ShopifyProduct";

export function ShopifyIntegration() {
  const [storeConfig, setStoreConfig] = useState({
    domain: '',
    storefrontToken: '',
    isConfigured: false
  });

  const [testProductId, setTestProductId] = useState('');

  const handleSaveConfig = () => {
    if (storeConfig.domain && storeConfig.storefrontToken) {
      // In a real app, save this to localStorage or backend
      localStorage.setItem('shopifyConfig', JSON.stringify({
        domain: storeConfig.domain,
        storefrontToken: storeConfig.storefrontToken
      }));
      setStoreConfig({ ...storeConfig, isConfigured: true });
    }
  };

  // Example product IDs for flooring products
  const exampleProducts = [
    { id: '7857989632173', name: 'Luxury Vinyl Plank - Oak', variant: '43567890123456' },
    { id: '7857989632174', name: 'Porcelain Tile - Marble Look', variant: '43567890123457' },
    { id: '7857989632175', name: 'Carpet Tile - Commercial Grade', variant: '43567890123458' }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopify Integration Setup
          </CardTitle>
          <CardDescription>
            Connect your Shopify store to sell flooring products directly from your website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!storeConfig.isConfigured ? (
            <>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Setup Required</AlertTitle>
                <AlertDescription>
                  To integrate Shopify, you need:
                  <ol className="list-decimal ml-4 mt-2">
                    <li>A Shopify store with products</li>
                    <li>A Storefront API access token (create one in your Shopify admin → Settings → Apps → Develop apps)</li>
                    <li>Your Shopify store domain (e.g., your-store.myshopify.com)</li>
                  </ol>
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="domain">Shopify Store Domain</Label>
                  <Input
                    id="domain"
                    placeholder="your-store.myshopify.com"
                    value={storeConfig.domain}
                    onChange={(e) => setStoreConfig({ ...storeConfig, domain: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="token">Storefront Access Token</Label>
                  <Input
                    id="token"
                    type="password"
                    placeholder="Your storefront access token"
                    value={storeConfig.storefrontToken}
                    onChange={(e) => setStoreConfig({ ...storeConfig, storefrontToken: e.target.value })}
                  />
                </div>

                <Button onClick={handleSaveConfig} className="w-full">
                  Save Configuration
                </Button>
              </div>
            </>
          ) : (
            <Alert className="border-green-500 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle>Configuration Saved</AlertTitle>
              <AlertDescription>
                Your Shopify store is configured. Add ShopifyProduct components to display products.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {storeConfig.isConfigured && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Test Product Display</CardTitle>
              <CardDescription>
                Enter a Shopify product ID to test the integration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="productId">Product ID</Label>
                <Input
                  id="productId"
                  placeholder="e.g., 7857989632173"
                  value={testProductId}
                  onChange={(e) => setTestProductId(e.target.value)}
                />
              </div>

              {testProductId && (
                <ShopifyProduct
                  productId={testProductId}
                  showProductTitle={true}
                  showPrice={true}
                  showQuantity={true}
                  buttonText="Add to Cart"
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Example Products</CardTitle>
              <CardDescription>
                Sample flooring products from your Shopify store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {exampleProducts.map((product) => (
                  <div key={product.id}>
                    <h3 className="text-sm font-medium mb-2">{product.name}</h3>
                    <ShopifyProduct
                      productId={product.id}
                      variantId={product.variant}
                      showProductTitle={false}
                      showPrice={true}
                      showQuantity={true}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}