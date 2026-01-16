import { Button } from "@/components/ui/button";
import { Wrench, CreditCard } from "lucide-react";
import heroPhone1 from "@/assets/hero-phone-1.png";
import heroPhone2 from "@/assets/hero-phone-2.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[hsl(185,94%,50%)]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-[hsl(160,84%,39%)]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(199 89% 48% / 0.3) 1px, transparent 0)`,
        backgroundSize: "50px 50px",
      }} />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium animate-fade-in">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Expert Mobile Care
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <span className="gradient-text">Mobile</span>
                <br />
                <span className="text-foreground">Hospital</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-muted-foreground font-light animate-fade-in" style={{ animationDelay: "0.2s" }}>
                We <span className="text-primary font-medium">Heal</span> Your Smartphone
              </p>
            </div>

            <p className="text-muted-foreground max-w-lg mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              From quick repairs to premium smartphones on EMI, we're your one-stop destination for all mobile needs. Expert technicians, genuine parts, and unmatched service.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Button variant="hero" size="lg" className="group">
                <Wrench className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Book Repair
              </Button>
              <Button variant="heroOutline" size="lg" className="group">
                <CreditCard className="mr-2 h-5 w-5" />
                Explore Phones on EMI
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              {[
                { value: "1000+", label: "Devices Repaired" },
                { value: "500+", label: "Happy Customers" },
                { value: "2", label: "Branches" },
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Floating Phones */}
          <div className="relative h-[400px] lg:h-[600px] hidden lg:block">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Main Phone */}
              <div className="relative floating-animation">
                <img
                  src={heroPhone1}
                  alt="Premium Smartphone"
                  className="w-72 h-auto drop-shadow-2xl"
                />
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full -z-10" />
              </div>
              
              {/* Secondary Phone */}
              <div className="absolute top-20 right-10 floating-animation-delayed">
                <img
                  src={heroPhone2}
                  alt="Mobile Device"
                  className="w-48 h-auto drop-shadow-2xl opacity-80"
                />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-10 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-primary/30 to-transparent blur-2xl" />
              <div className="absolute top-1/4 -left-10 w-24 h-24 rounded-full bg-[hsl(185,94%,50%)]/20 blur-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
