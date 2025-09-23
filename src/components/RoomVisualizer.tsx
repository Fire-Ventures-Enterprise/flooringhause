import { Button } from "@/components/ui/button";
import { Camera, Palette, Download } from "lucide-react";

const RoomVisualizer = () => {
  return (
    <section id="visualizer" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Visualize Your Dream Floor
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Try our advanced room visualizer to see how different flooring options look in your actual space. 
              Upload a photo of your room and experiment with hundreds of styles.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-gradient-hero rounded-lg flex items-center justify-center flex-shrink-0">
                  <Camera className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">Upload Your Room</h3>
                  <p className="text-muted-foreground">
                    Take a photo or upload an existing image of your space
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-gradient-hero rounded-lg flex items-center justify-center flex-shrink-0">
                  <Palette className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">Choose Flooring</h3>
                  <p className="text-muted-foreground">
                    Browse and apply different flooring styles instantly
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-gradient-hero rounded-lg flex items-center justify-center flex-shrink-0">
                  <Download className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">Save & Share</h3>
                  <p className="text-muted-foreground">
                    Download your designs or share with family and contractors
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="minimal" size="lg">
                Try Room Visualizer
              </Button>
              <Button variant="outline" size="lg">
                View Gallery
              </Button>
            </div>
          </div>

          <div className="relative">
            {/* Visualizer Preview Placeholder */}
            <div className="relative rounded-lg overflow-hidden shadow-large">
              <div className="aspect-[4/3] bg-gradient-to-br from-warm-beige to-muted">
                <div className="absolute inset-0 bg-gradient-wood opacity-10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="h-20 w-20 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <p className="text-xl font-semibold text-foreground">Room Visualizer</p>
                    <p className="text-muted-foreground mt-2">Interactive Preview</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-card rounded-lg shadow-medium p-3 border border-border">
              <p className="text-sm font-semibold text-foreground">1M+ Designs Created</p>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card rounded-lg shadow-medium p-3 border border-border">
              <p className="text-sm font-semibold text-foreground">AI-Powered Technology</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomVisualizer;