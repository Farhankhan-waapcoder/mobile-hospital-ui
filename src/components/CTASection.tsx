import { MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section  className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-[hsl(185,94%,50%)]/10 to-[hsl(160,84%,39%)]/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[hsl(185,94%,50%)]/20 rounded-full blur-3xl" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 lg:p-16 text-center max-w-4xl mx-auto border-primary/30">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
  Contact <span className="gradient-text">Mobile Hospital</span>
  <br />
  in Biswan, Sitapur
</h2>

          
         <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
  Visit Mobile Hospital – a trusted mobile repairing shop in 
  <span className="font-medium"> Biswan, Sitapur</span>. 
  We fix screens, batteries, and provide smartphones on EMI with fast service.
</p>


          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button 
              asChild
              variant="hero" 
              size="xl" 
              className="group"
            >
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=27.4930241,80.9965207&destination_place_id=ChIJhwPWW0wlOTkRm2oQDPDSjno"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Visit Store
              </a>
            </Button>
           <Button
  asChild
  variant="heroOutline"
  size="xl"
  className="group"
>
  <a
    href="https://wa.me/919569990341"
    target="_blank"
    rel="noopener noreferrer"
  >
    <MessageCircle className="mr-2 h-5 w-5" />
    Contact on WhatsApp
  </a>
</Button>

          </div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
  <MapPin className="h-4 w-4 text-primary" />
  <span>
    Biswan, Sitapur, Uttar Pradesh
  </span>
</div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            
            <Phone className="h-4 w-4 text-primary" />
            <span>Or call us: </span>
            <a href="tel:+919569990341" className="text-primary font-medium hover:underline">
              +91 9569990341
            </a>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-xs text-muted-foreground/70 italic">
              * Forgot password unlock services are provided only after ownership verification. Data loss may occur.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
