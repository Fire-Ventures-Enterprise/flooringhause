import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface SnipcartProductProps {
  id: string;
  name: string;
  price: number;
  url?: string;
  description?: string;
  image?: string;
  categories?: string;
  metadata?: Record<string, any>;
  customFields?: Array<{
    name: string;
    options: string;
    required?: boolean;
  }>;
  quantity?: number;
  stackable?: boolean;
  className?: string;
  buttonText?: string;
  buttonVariant?: "default" | "secondary" | "outline" | "ghost" | "link" | "destructive";
}

export function SnipcartProduct({
  id,
  name,
  price,
  url = window.location.href,
  description,
  image,
  categories,
  metadata,
  customFields,
  quantity = 1,
  stackable = true,
  className = "",
  buttonText = "Add to Cart",
  buttonVariant = "default",
}: SnipcartProductProps) {
  
  // Build custom field attributes
  const customFieldsAttrs: Record<string, string> = {};
  customFields?.forEach((field, index) => {
    customFieldsAttrs[`data-item-custom${index + 1}-name`] = field.name;
    customFieldsAttrs[`data-item-custom${index + 1}-options`] = field.options;
    if (field.required) {
      customFieldsAttrs[`data-item-custom${index + 1}-required`] = "true";
    }
  });

  // Build metadata attributes
  const metadataAttrs: Record<string, string> = {};
  if (metadata) {
    Object.entries(metadata).forEach(([key, value]) => {
      metadataAttrs[`data-item-metadata-${key}`] = String(value);
    });
  }

  return (
    <Button
      className={`snipcart-add-item ${className}`}
      variant={buttonVariant}
      data-item-id={id}
      data-item-price={price}
      data-item-url={url}
      data-item-name={name}
      data-item-description={description}
      data-item-image={image}
      data-item-categories={categories}
      data-item-quantity={quantity}
      data-item-stackable={stackable}
      {...customFieldsAttrs}
      {...metadataAttrs}
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      {buttonText}
    </Button>
  );
}

// Cart Summary Component
export function SnipcartCartSummary() {
  return (
    <div className="snipcart-summary flex items-center gap-4">
      <button className="snipcart-checkout flex items-center gap-2 text-sm">
        <ShoppingCart className="h-4 w-4" />
        <span className="snipcart-items-count">0</span> items
        <span className="snipcart-total-price font-semibold">$0.00</span>
      </button>
    </div>
  );
}

// Initialize Snipcart
export function useSnipcart(publicApiKey: string) {
  useEffect(() => {
    // Check if Snipcart is already loaded
    if (window.Snipcart) return;

    // Set Snipcart settings
    window.SnipcartSettings = {
      publicApiKey,
      loadStrategy: "on-user-interaction",
      modalStyle: "side",
      currency: "usd",
    };

    // Create and append script
    const script = document.createElement("script");
    script.src = "https://cdn.snipcart.com/themes/v3.7.1/default/snipcart.js";
    script.async = true;
    document.body.appendChild(script);

    // Create and append CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.snipcart.com/themes/v3.7.1/default/snipcart.css";
    document.head.appendChild(link);

    // Add hidden div for Snipcart
    const snipcartDiv = document.createElement("div");
    snipcartDiv.hidden = true;
    snipcartDiv.id = "snipcart";
    snipcartDiv.setAttribute("data-api-key", publicApiKey);
    document.body.appendChild(snipcartDiv);

    return () => {
      // Cleanup if needed
      const existingScript = document.querySelector('script[src*="snipcart.js"]');
      const existingLink = document.querySelector('link[href*="snipcart.css"]');
      const existingDiv = document.getElementById("snipcart");
      
      if (existingScript) existingScript.remove();
      if (existingLink) existingLink.remove();
      if (existingDiv) existingDiv.remove();
    };
  }, [publicApiKey]);
}

// TypeScript declarations
declare global {
  interface Window {
    Snipcart: any;
    SnipcartSettings: {
      publicApiKey: string;
      loadStrategy?: string;
      modalStyle?: string;
      currency?: string;
    };
  }
}