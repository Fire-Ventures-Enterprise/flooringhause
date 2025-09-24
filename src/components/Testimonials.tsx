import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Toronto, ON",
    rating: 5,
    text: "FlooringHouse transformed our entire home with beautiful hardwood floors. The quality is exceptional and the installation team was professional and efficient.",
    project: "Whole Home Renovation",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Vancouver, BC",
    rating: 5,
    text: "Best flooring experience! The room visualizer helped us choose the perfect tile for our kitchen. The result exceeded our expectations.",
    project: "Kitchen Remodel",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Calgary, AB",
    rating: 5,
    text: "Outstanding service from consultation to installation. The waterproof vinyl plank is perfect for our busy family with kids and pets.",
    project: "Living Areas",
  },
  {
    id: 4,
    name: "David Thompson",
    location: "Montreal, QC",
    rating: 5,
    text: "The quality of the natural stone flooring is incredible. FlooringHouse made the entire process seamless and stress-free.",
    project: "Luxury Bathroom",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied homeowners who transformed their spaces with FlooringHouse
          </p>
        </div>

        <Carousel className="max-w-6xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-1">
                  <div className="bg-card rounded-lg p-8 shadow-medium h-full relative">
                    <Quote className="absolute top-6 right-6 h-8 w-8 text-accent/20" />
                    
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                      ))}
                    </div>

                    <p className="text-foreground mb-6 text-lg italic">
                      "{testimonial.text}"
                    </p>

                    <div className="border-t border-border pt-4">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      <p className="text-sm text-accent mt-1">{testimonial.project}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-8 bg-card rounded-lg px-8 py-4 shadow-soft">
            <div>
              <p className="text-3xl font-bold text-foreground">50,000+</p>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div>
              <p className="text-3xl font-bold text-foreground">4.9/5</p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div>
              <p className="text-3xl font-bold text-foreground">15+</p>
              <p className="text-sm text-muted-foreground">Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;