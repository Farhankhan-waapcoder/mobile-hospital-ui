import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Regular Customer",
    content: "Got my iPhone screen replaced in just 2 hours. The quality is amazing and the price was very reasonable. Highly recommended!",
    rating: 5,
  },
  {
    name: "Priya Singh",
    role: "Business Owner",
    content: "I bought my Samsung on EMI from Mobile Hospital. The process was smooth and the staff was very helpful. Great service!",
    rating: 5,
  },
  {
    name: "Amit Kumar",
    role: "Student",
    content: "Best place for mobile accessories. They have everything I need and the prices are competitive. Will definitely come back!",
    rating: 5,
  },
  {
    name: "Sneha Patel",
    role: "Working Professional",
    content: "My phone had a motherboard issue and they fixed it when others said it was impossible. True experts!",
    rating: 5,
  },
];

const stats = [
  { value: 1000, suffix: "+", label: "Devices Repaired" },
  { value: 500, suffix: "+", label: "Happy Customers" },
  { value: 5, suffix: "", label: "Years Experience" },
  { value: 2, suffix: "", label: "Branches" },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setAnimatedStats(
        stats.map((stat) => Math.floor((stat.value * currentStep) / steps))
      );
      if (currentStep >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-dark-800/50" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Counter */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="glass-card p-6 text-center rounded-2xl">
              <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                {animatedStats[index]}{stat.suffix}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            What Our Customers <span className="gradient-text">Say</span>
          </h2>
        </div>

        {/* Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          <div className="glass-card p-8 lg:p-12 rounded-3xl relative">
            <Quote className="absolute top-6 left-6 h-12 w-12 text-primary/20" />
            
            <div className="text-center space-y-6">
              {/* Stars */}
              <div className="flex justify-center gap-1">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-xl lg:text-2xl text-foreground leading-relaxed">
                "{testimonials[currentIndex].content}"
              </p>

              {/* Author */}
              <div>
                <div className="font-semibold text-foreground">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-muted-foreground text-sm">
                  {testimonials[currentIndex].role}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
              >
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-8 bg-primary"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
              >
                <ChevronRight className="h-5 w-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
