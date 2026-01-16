import { Wrench, RefreshCw, CreditCard, Headphones, Palette, Battery, Monitor, Cpu } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Mobile Repair",
    description: "Screen replacement, battery, motherboard & more",
    color: "from-primary to-[hsl(185,94%,50%)]",
  },
  {
    icon: RefreshCw,
    title: "Buy & Sell",
    description: "Quality second-hand phones with warranty",
    color: "from-[hsl(185,94%,50%)] to-[hsl(160,84%,39%)]",
  },
  {
    icon: CreditCard,
    title: "EMI Plans",
    description: "Get new smartphones with easy monthly payments",
    color: "from-[hsl(160,84%,39%)] to-primary",
  },
  {
    icon: Headphones,
    title: "Accessories",
    description: "Premium cables, chargers, cases & more",
    color: "from-primary to-[hsl(280,84%,60%)]",
  },
  {
    icon: Palette,
    title: "Custom Skins",
    description: "Personalize your device with unique designs",
    color: "from-[hsl(280,84%,60%)] to-[hsl(185,94%,50%)]",
  },
];

const repairTypes = [
  { icon: Monitor, label: "Screen Repair" },
  { icon: Battery, label: "Battery Replacement" },
  { icon: Cpu, label: "Motherboard Repair" },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-dark-800/50 to-background" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Our Services
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Everything Your Phone <span className="gradient-text">Needs</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From repairs to upgrades, we've got you covered with professional services and genuine parts.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group glass-card-hover p-6 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.color} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                <service.icon className="h-6 w-6 text-background" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Repair Types */}
        <div className="glass-card p-8 rounded-3xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground">Expert Repair Services</h3>
            <p className="text-muted-foreground mt-2">Our technicians specialize in all types of repairs</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {repairTypes.map((type, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300 hover:bg-white/10"
              >
                <div className="p-2 rounded-lg bg-primary/20">
                  <type.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium text-foreground">{type.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
