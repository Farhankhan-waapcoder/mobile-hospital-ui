import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId;

  useEffect(() => {
    if (!orderId) {
      navigate("/");
    }
  }, [orderId, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card rounded-3xl p-8 lg:p-12 text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-400" />
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Order Placed <span className="gradient-text">Successfully!</span>
            </h1>
            
            <p className="text-muted-foreground mb-2">
              Thank you for your purchase. Your order has been confirmed.
            </p>
            
            {orderId && (
              <div className="glass-card rounded-xl p-4 my-6 bg-white/5">
                <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                <p className="text-lg font-mono font-semibold text-primary">
                  #{orderId.slice(-8).toUpperCase()}
                </p>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                variant="hero"
                size="lg"
                onClick={() => navigate("/my-orders")}
              >
                <Package className="mr-2 h-5 w-5" />
                View My Orders
              </Button>
              <Button
                variant="heroOutline"
                size="lg"
                onClick={() => navigate("/products")}
              >
                Continue Shopping
              </Button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-sm text-muted-foreground">
                You will receive a confirmation email shortly with order details.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                For any queries, contact us at{" "}
                <a href="tel:+919569990341" className="text-primary hover:underline">
                  +91 9569990341
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderSuccess;
