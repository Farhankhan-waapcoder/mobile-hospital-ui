import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Calendar, MapPin, Phone, User, CreditCard } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface OrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
  price: number;
}

interface ShippingAddress {
  fullName: string;
  phone: string;
  houseNo: string;
  street: string;
  landmark?: string;
  city: string;
  district: string;
  state: string;
  postalCode: string;
  country: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: ShippingAddress;
  paymentStatus: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: string;
  updatedAt: string;
}

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

  const fetchOrderDetail = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`https://mobile-hospital-backend.onrender.com/api/orders/my-orders/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Order Detail API Response:", data);

      if (data.success) {
        setOrder(data.data);
      } else {
        toast({
          title: "Failed to fetch order",
          description: data.message || "Could not load order details",
          variant: "destructive",
        });
        navigate("/my-orders");
      }
    } catch (error) {
      console.error("Failed to fetch order:", error);
      toast({
        title: "Connection Error",
        description: "Could not connect to the server. Please try again.",
        variant: "destructive",
      });
      navigate("/my-orders");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      shipped: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      delivered: "bg-green-500/20 text-green-400 border-green-500/30",
      cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return colors[status] || colors.pending;
  };

  const getPaymentStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      paid: "bg-green-500/20 text-green-400 border-green-500/30",
      failed: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return colors[status] || colors.pending;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
          <div className="glass-card rounded-2xl p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading order details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate("/my-orders")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to My Orders
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Header */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Placed on {formatDate(order.createdAt)}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Order Status:</span>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Payment Status:</span>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Items ({order.items.length})
              </h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-4 pb-4 border-b border-white/10 last:border-0 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors"
                    onClick={() => navigate(`/products/${item.product._id}`)}
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Price: ₹{item.price}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground text-lg">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </h2>
              <div className="text-foreground space-y-1">
                <p className="font-semibold text-lg flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  {order.shippingAddress.fullName}
                </p>
                <p className="ml-6">{order.shippingAddress.houseNo}, {order.shippingAddress.street}</p>
                {order.shippingAddress.landmark && (
                  <p className="text-sm text-muted-foreground ml-6">{order.shippingAddress.landmark}</p>
                )}
                <p className="ml-6">{order.shippingAddress.city}, {order.shippingAddress.district}</p>
                <p className="ml-6">{order.shippingAddress.state} - {order.shippingAddress.postalCode}</p>
                <p className="ml-6">{order.shippingAddress.country}</p>
                <p className="flex items-center gap-2 text-muted-foreground mt-3">
                  <Phone className="h-4 w-4 text-primary" />
                  {order.shippingAddress.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{order.totalAmount}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between text-foreground font-bold text-xl">
                  <span>Total</span>
                  <span className="text-primary">₹{order.totalAmount}</span>
                </div>
              </div>

              {order.razorpayOrderId && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Payment Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Order ID:</span>
                      <span className="text-foreground font-mono text-xs">{order.razorpayOrderId}</span>
                    </div>
                    {order.razorpayPaymentId && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment ID:</span>
                        <span className="text-foreground font-mono text-xs">{order.razorpayPaymentId}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(`https://wa.me/919569990341?text=${encodeURIComponent(`Hi! I have a question about Order #${order._id.slice(-8).toUpperCase()}`)}`, "_blank")}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default OrderDetail;
