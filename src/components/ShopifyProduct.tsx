import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ShopifyProductProps {
  productId: string;
  variantId?: string;
  showProductTitle?: boolean;
  showPrice?: boolean;
  showQuantity?: boolean;
  buttonText?: string;
  className?: string;
}

export function ShopifyProduct({
  productId,
  variantId,
  showProductTitle = true,
  showPrice = true,
  showQuantity = true,
  buttonText = "Add to Cart",
  className = "",
}: ShopifyProductProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Check if Shopify Buy Button script is already loaded
    if (!scriptLoadedRef.current && !window.ShopifyBuy) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
      
      script.onload = () => {
        scriptLoadedRef.current = true;
        initializeShopifyButton();
      };
      
      document.head.appendChild(script);
    } else if (window.ShopifyBuy) {
      initializeShopifyButton();
    }

    function initializeShopifyButton() {
      if (!window.ShopifyBuy || !containerRef.current) return;

      const client = window.ShopifyBuy.buildClient({
        domain: 'your-store.myshopify.com', // Replace with your Shopify domain
        storefrontAccessToken: 'your-storefront-access-token' // Replace with your token
      });

      const ui = window.ShopifyBuy.UI.init(client);

      ui.createComponent('product', {
        id: productId,
        variantId: variantId,
        node: containerRef.current,
        options: {
          product: {
            styles: {
              product: {
                "@media (min-width: 601px)": {
                  "max-width": "100%",
                  "margin-left": "0",
                  "margin-bottom": "0"
                }
              },
              button: {
                "font-family": "inherit",
                "font-size": "14px",
                "padding-top": "12px",
                "padding-bottom": "12px",
                "color": "hsl(var(--primary-foreground))",
                "background-color": "hsl(var(--primary))",
                ":hover": {
                  "background-color": "hsl(var(--primary))",
                  "opacity": "0.9"
                },
                "border-radius": "6px",
                ":focus": {
                  "background-color": "hsl(var(--primary))"
                }
              },
              productSet: {
                "styles": {
                  "products": {
                    "@media (min-width: 601px)": {
                      "margin-left": "-10px"
                    }
                  }
                }
              }
            },
            contents: {
              title: showProductTitle,
              price: showPrice,
              quantity: showQuantity,
              quantityIncrement: showQuantity,
              quantityDecrement: showQuantity,
              quantityInput: showQuantity,
            },
            text: {
              button: buttonText
            }
          },
          cart: {
            styles: {
              button: {
                "font-family": "inherit",
                "font-size": "14px",
                "padding-top": "12px",
                "padding-bottom": "12px",
                "color": "hsl(var(--primary-foreground))",
                "background-color": "hsl(var(--primary))",
                ":hover": {
                  "background-color": "hsl(var(--primary))",
                  "opacity": "0.9"
                },
                "border-radius": "6px",
                ":focus": {
                  "background-color": "hsl(var(--primary))"
                }
              }
            }
          },
          toggle: {
            styles: {
              toggle: {
                "background-color": "hsl(var(--primary))",
                ":hover": {
                  "background-color": "hsl(var(--primary))"
                },
                ":focus": {
                  "background-color": "hsl(var(--primary))"
                }
              }
            }
          }
        }
      });
    }

    return () => {
      // Cleanup if needed
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [productId, variantId, showProductTitle, showPrice, showQuantity, buttonText]);

  return (
    <Card className={`p-4 ${className}`}>
      <div ref={containerRef}>
        <Skeleton className="h-32 w-full" />
      </div>
    </Card>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ShopifyBuy: any;
  }
}