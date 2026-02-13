import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, Phone, MapPin, User, CreditCard, Home, Map } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    shippingAddress: {
      fullName: "",
      phone: "",
      houseNo: "",
      street: "",
      landmark: "",
      city: "",
      district: "",
      state: "",
      postalCode: "",
      country: "India",
    },
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setFormData((prev) => ({
        ...prev,
        customerName: user.name || "",
        shippingAddress: {
          ...prev.shippingAddress,
          fullName: user.name || "",
        },
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData({
        ...formData,
        shippingAddress: {
          ...formData.shippingAddress,
          [addressField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleStateChange = (value: string) => {
    setFormData({
      ...formData,
      shippingAddress: {
        ...formData.shippingAddress,
        state: value,
      },
    });
  };

  const handleRemoveItem = (productId: string) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("accessToken");
      const items = cart.map((item) => ({
        product: item.productId,
        quantity: item.quantity,
      }));

      const response = await fetch("https://mobile-hospital-backend.onrender.com/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          items,
          customerName: formData.shippingAddress.fullName,
          customerPhone: formData.shippingAddress.phone,
          shippingAddress: formData.shippingAddress,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const { razorpayOrder, key, order } = data.data;

        const options = {
          key: key,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: "Mobile Hospital",
          description: "Product Purchase",
          order_id: razorpayOrder.id,
          handler: async function (response: any) {
            try {
              const verifyRes = await fetch(
                "https://mobile-hospital-backend.onrender.com/api/orders/verify-payment",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                  }),
                }
              );

              const verifyData = await verifyRes.json();

              if (verifyData.success) {
                localStorage.removeItem("cart");
                toast({
                  title: "Payment Successful!",
                  description: "Your order has been placed successfully.",
                });
                navigate("/order-success", { state: { orderId: verifyData.data._id } });
              } else {
                toast({
                  title: "Payment Verification Failed",
                  description: verifyData.message || "Please contact support",
                  variant: "destructive",
                });
              }
            } catch (error) {
              console.error("Payment verification error:", error);
              toast({
                title: "Verification Error",
                description: "Payment received but verification failed. Please contact support.",
                variant: "destructive",
              });
            }
          },
          prefill: {
            name: formData.shippingAddress.fullName,
            contact: formData.shippingAddress.phone,
          },
          theme: {
            color: "#4f46e5",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast({
          title: "Order Failed",
          description: data.message || "Failed to create order",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Connection Error",
        description: "Could not connect to the server. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
          <div className="glass-card rounded-2xl p-12 text-center max-w-md mx-auto">
            <ShoppingCart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Your Cart is Empty</h3>
            <p className="text-muted-foreground mb-6">
              Add some products to your cart to proceed with checkout.
            </p>
            <Button variant="hero" onClick={() => navigate("/products")}>
              Browse Products
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
            Checkout
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-2xl p-6 mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Cart Items
                </h2>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.productId} className="flex items-center gap-4 pb-4 border-b border-white/10 last:border-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                        <p className="text-muted-foreground text-sm">Quantity: {item.quantity}</p>
                        <p className="text-primary font-semibold">₹{item.price} × {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground text-lg">₹{item.price * item.quantity}</p>
                        <button
                          onClick={() => handleRemoveItem(item.productId)}
                          className="text-red-400 hover:text-red-300 text-sm mt-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Details */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Shipping Details
                </h2>
                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="text"
                          name="address.fullName"
                          value={formData.shippingAddress.fullName}
                          onChange={handleChange}
                          placeholder="Receiver's full name"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="tel"
                          name="address.phone"
                          value={formData.shippingAddress.phone}
                          onChange={handleChange}
                          placeholder="10-digit phone number"
                          className="pl-10"
                          required
                          pattern="[0-9]{10}"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      House/Flat/Building No. <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="text"
                        name="address.houseNo"
                        value={formData.shippingAddress.houseNo}
                        onChange={handleChange}
                        placeholder="e.g., B-42, Flat 301"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Street/Road/Area <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="text"
                        name="address.street"
                        value={formData.shippingAddress.street}
                        onChange={handleChange}
                        placeholder="Street name, area"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Landmark (Optional)
                    </label>
                    <div className="relative">
                      <Map className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="text"
                        name="address.landmark"
                        value={formData.shippingAddress.landmark}
                        onChange={handleChange}
                        placeholder="Nearby landmark"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        City <span className="text-red-400">*</span>
                      </label>
                      <Input
                        type="text"
                        name="address.city"
                        value={formData.shippingAddress.city}
                        onChange={handleChange}
                        placeholder="City/Town"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        District <span className="text-red-400">*</span>
                      </label>
                      <Input
                        type="text"
                        name="address.district"
                        value={formData.shippingAddress.district}
                        onChange={handleChange}
                        placeholder="District"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        State <span className="text-red-400">*</span>
                      </label>
                      <Select
                        value={formData.shippingAddress.state}
                        onValueChange={handleStateChange}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {INDIAN_STATES.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        PIN Code <span className="text-red-400">*</span>
                      </label>
                      <Input
                        type="text"
                        name="address.postalCode"
                        value={formData.shippingAddress.postalCode}
                        onChange={handleChange}
                        placeholder="6-digit PIN code"
                        required
                        pattern="[0-9]{6}"
                        maxLength={6}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Country
                    </label>
                    <Input
                      type="text"
                      name="address.country"
                      value={formData.shippingAddress.country}
                      onChange={handleChange}
                      placeholder="Country"
                      disabled
                      className="bg-muted/50"
                    />
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-2xl p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex justify-between text-foreground font-bold text-lg">
                    <span>Total</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  onClick={handlePlaceOrder}
                  disabled={
                    loading ||
                    !formData.shippingAddress.fullName ||
                    !formData.shippingAddress.phone ||
                    !formData.shippingAddress.houseNo ||
                    !formData.shippingAddress.street ||
                    !formData.shippingAddress.city ||
                    !formData.shippingAddress.district ||
                    !formData.shippingAddress.state ||
                    !formData.shippingAddress.postalCode
                  }
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  {loading ? "Processing..." : "Proceed to Payment"}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Secure payment powered by Razorpay
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
