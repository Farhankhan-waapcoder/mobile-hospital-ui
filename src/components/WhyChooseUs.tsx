import { Zap, Shield, Wallet, UserCheck, BadgeCheck } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast Service",
    description: "Same-day repairs for most issues",
  },
  {
    icon: Shield,
    title: "Genuine Parts",
    description: "100% authentic components",
  },
  {
    icon: Wallet,
    title: "Affordable EMI",
    description: "0% interest available",
  },
  {
    icon: UserCheck,
    title: "Expert Technicians",
    description: "Certified professionals",
  },
  {
    icon: BadgeCheck,
    title: "Warranty Support",
    description: "Up to 6 months warranty",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-[hsl(185,94%,50%)]/5" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-2 rounded-full bg-[hsl(160,84%,39%)]/10 text-[hsl(160,84%,39%)] text-sm font-medium">
            Why Choose Us
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            The Mobile Hospital <span className="gradient-text">Advantage</span>
          </h2>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group glass-card-hover p-6 text-center"
            >
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-[hsl(185,94%,50%)]/20 mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
