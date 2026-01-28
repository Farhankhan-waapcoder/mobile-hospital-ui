import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "919569990341";
  const message = "Hi! I'm interested in your mobile services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Contact us on WhatsApp"
    >
      <div className="relative">
        {/* Pulse Animation */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-30" />
        
        {/* Button */}
        <div className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform duration-300">
          <MessageCircle className="h-7 w-7 text-white" />
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-foreground text-background text-sm font-medium px-3 py-2 rounded-lg whitespace-nowrap">
            Chat with us!
          </div>
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
