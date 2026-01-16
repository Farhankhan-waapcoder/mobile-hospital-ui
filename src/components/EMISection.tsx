import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const emiPlans = [
  {
    name: "Starter",
    price: "₹499",
    duration: "12 months",
    features: [
      "Budget smartphones",
      "Basic warranty",
      "Easy documentation",
      "Quick approval",
    ],
    popular: false,
  },
  {
    name: "Popular",
    price: "₹999",
    duration: "12 months",
    features: [
      "Mid-range phones",
      "Extended warranty",
      "Priority support",
      "Free accessories",
      "0% Interest",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "₹1,999",
    duration: "12 months",
    features: [
      "Flagship phones",
      "Premium warranty",
      "Dedicated support",
      "Free insurance",
      "Trade-in bonus",
    ],
    popular: false,
  },
];

const EMISection = () => {
  return (
    <section id="emi" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-2 rounded-full bg-[hsl(185,94%,50%)]/10 text-[hsl(185,94%,50%)] text-sm font-medium">
            Affordable Plans
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Smartphones on <span className="gradient-text">Easy EMI</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get your dream smartphone today with flexible payment options. 0% interest available on select models.
          </p>
        </div>

        {/* EMI Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {emiPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative glass-card rounded-3xl p-6 lg:p-8 transition-all duration-300 hover:scale-[1.02] ${
                plan.popular
                  ? "border-primary/50 shadow-xl shadow-primary/20"
                  : "border-white/10"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-[hsl(185,94%,50%)] text-background text-sm font-medium">
                    <Sparkles className="h-4 w-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">for {plan.duration}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[hsl(160,84%,39%)]/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-[hsl(160,84%,39%)]" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "hero" : "heroOutline"}
                className="w-full"
              >
                Check Eligibility
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom Badge */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card border-[hsl(160,84%,39%)]/30">
            <span className="flex h-3 w-3 rounded-full bg-[hsl(160,84%,39%)] animate-pulse" />
            <span className="text-[hsl(160,84%,39%)] font-medium">0% Interest Available</span>
            <span className="text-muted-foreground">on select models</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EMISection;
