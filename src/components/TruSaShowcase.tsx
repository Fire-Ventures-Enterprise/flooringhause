import { Button } from "@/components/ui/button";
import { ExternalLink, Award, Truck } from "lucide-react";

const TruSaShowcase = () => {
  const mosaicProducts = [
    { name: "Verona Carrera Marble", type: "Polished Mosaic" },
    { name: "Lantern Black Sky", type: "Marble Polished Mosaic" },
    { name: "Picket Fusion", type: "Marble Polished" },
    { name: "Large Hex Carrera", type: "Polished Mosaic" },
    { name: "Roman Valensa Grey", type: "Polished Stone" },
    { name: "Hexagon Pattern", type: "Premium Mosaic" },
  ];

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="h-6 w-6 text-accent" />
            <span className="text-sm uppercase tracking-wider text-muted-foreground">
              Exclusive Supplier Partnership
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            TruSa Premium Mosaics & Medallions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Direct from manufacturer. Featuring exclusive tile, stone, and SPC collections 
            with unmatched quality and craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {mosaicProducts.map((product, index) => (
            <div key={index} className="bg-white p-4 rounded shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-square bg-neutral-100 rounded mb-3"></div>
              <h4 className="font-medium text-sm">{product.name}</h4>
              <p className="text-xs text-muted-foreground">{product.type}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <Truck className="h-8 w-8 mx-auto mb-2 text-accent" />
              <h3 className="font-semibold mb-1">Direct Supply</h3>
              <p className="text-sm text-muted-foreground">Manufacturer direct pricing</p>
            </div>
            <div className="text-center">
              <Award className="h-8 w-8 mx-auto mb-2 text-accent" />
              <h3 className="font-semibold mb-1">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">Highest grade materials</p>
            </div>
            <div className="text-center">
              <ExternalLink className="h-8 w-8 mx-auto mb-2 text-accent" />
              <h3 className="font-semibold mb-1">Exclusive Access</h3>
              <p className="text-sm text-muted-foreground">Unique designs & patterns</p>
            </div>
          </div>
          <div className="text-center">
            <Button variant="minimal" size="lg">
              Browse TruSa Collection
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TruSaShowcase;