import { MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-[hsl(185,94%,50%)]/10 to-[hsl(160,84%,39%)]/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[hsl(185,94%,50%)]/20 rounded-full blur-3xl" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 lg:p-16 text-center max-w-4xl mx-auto border-primary/30">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Your Phone Deserves
            <br />
            <span className="gradient-text">Expert Care</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Whether it's a cracked screen, battery issue, or you're looking for a new smartphone on EMI – we're here to help.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button variant="hero" size="xl" className="group">
              <MapPin className="mr-2 h-5 w-5" />
              Visit Store
            </Button>
            <Button variant="heroOutline" size="xl" className="group">
              <MessageCircle className="mr-2 h-5 w-5" />
              Contact on WhatsApp
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4 text-primary" />
            <span>Or call us: </span>
            <a href="tel:+919876543210" className="text-primary font-medium hover:underline">
              +91 98765 43210
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
