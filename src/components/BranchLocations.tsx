import { useState } from "react";
import { MapPin, User, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const branches = [
  {
    id: 1,
    name: "New Branch",
    handler: "Naved",
    coordinates: "27.4930241, 80.9965207",
    address: "near Power House, near Rituraj Bakery Ke Pass, Bada Chauraha, Biswan, sitapur",
    phone: "+91 9569990341",
    hours: "10:00 AM - 8:00 PM",
    mapUrl: "https://www.google.com/maps/place/Mobile+Hospital+Biswan/@27.4930241,80.9965207,735m/data=!3m1!1e3!4m14!1m7!3m6!1s0x3999254c5bd66387:0x7a94d2f00c106a9b!2sMobile+Hospital+Biswan!8m2!3d27.4930241!4d80.9965207!16s%2Fg%2F11yfq3qzjp!3m5!1s0x3999254c5bd66387:0x7a94d2f00c106a9b!8m2!3d27.4930241!4d80.9965207!16s%2Fg%2F11yfq3qzjp?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D",
    isNew: true,
  },
  {
    id: 2,
    name: "Old Branch",
    handler: "Javed",
    coordinates: "27°29'56.8\"N 80°59'35.7\"E",
    address: "City Center, laharpur chungi, biswan, sitapur",
    phone: "+91 7318491722",
    hours: "10:00 AM - 9:00 PM",
    mapUrl: "https://www.google.com/maps?q=27.499111,80.993250",
    isNew: false,
  },
];

const BranchLocations = () => {
  const [activeBranch, setActiveBranch] = useState(1);

  return (
    <section id="locations" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-dark-800/30 to-background" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Visit Us
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Our <span className="gradient-text">Locations</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the nearest Mobile Hospital branch and experience our premium service.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map Placeholder */}
          <div className="glass-card rounded-3xl overflow-hidden h-[400px] lg:h-full relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3551.2869862948443!2d80.99392767550185!3d27.493024176334586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3999254c5bd66387%3A0x7a94d2f00c106a9b!2sMobile%20Hospital%20Biswan!5e0!3m2!1sen!2sin!4v1737028800000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Branch Cards */}
          <div className="space-y-4">
            {branches.map((branch) => (
              <div
                key={branch.id}
                onClick={() => setActiveBranch(branch.id)}
                className={`glass-card p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activeBranch === branch.id
                    ? "border-primary/50 shadow-lg shadow-primary/20"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold text-foreground">{branch.name}</h3>
                      {branch.isNew && (
                        <span className="px-2 py-0.5 rounded-full bg-[hsl(160,84%,39%)] text-background text-xs font-medium">
                          NEW
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>Handled by {branch.handler}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${activeBranch === branch.id ? "bg-primary" : "bg-white/10"} transition-colors duration-300`}>
                    <MapPin className={`h-5 w-5 ${activeBranch === branch.id ? "text-background" : "text-foreground"}`} />
                  </div>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>{branch.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{branch.hours}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <code className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                    📍 {branch.coordinates}
                  </code>
                </div>

                {activeBranch === branch.id && (
                  <Button
                    variant="hero"
                    size="sm"
                    className="mt-4 w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(branch.mapUrl, "_blank");
                    }}
                  >
                    Get Directions
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BranchLocations;
