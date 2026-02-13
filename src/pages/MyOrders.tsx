import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Package, Calendar, ShoppingBag, ChevronLeft, ChevronRight, Filter } from "lucide-react";
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
  createdAt: string;
}

interface OrdersResponse {
  orders: Order[];
  total: number;
  page: number;
  totalPages: number;
}

const ORDER_STATUSES = [
  { value: "", label: "All Orders" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const MyOrders = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [ordersData, setOrdersData] = useState<OrdersResponse>({
    orders: [],
    total: 0,
    page: 1,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get("status") || "");

  const currentPage = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    fetchOrders();
  }, [currentPage, selectedStatus]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const params = new URLSearchParams();
      params.append("page", currentPage.toString());
      params.append("limit", "10");
      if (selectedStatus) params.append("status", selectedStatus);

      const response = await fetch(`https://mobile-hospital-backend.onrender.com/api/orders/my-orders?${params}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Orders API Response:", data);
      
      if (data.success) {
        setOrdersData(data.data);
      } else {
        toast({
          title: "Failed to fetch orders",
          description: data.message || "Could not load your orders",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast({
        title: "Connection Error",
        description: "Could not connect to the server. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    const params = new URLSearchParams(searchParams);
    if (status) {
      params.set("status", status);
    } else {
      params.delete("status");
    }
    params.set("page", "1");
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      pending: "bg-yellow-500/20 text-yellow-400",
      paid: "bg-green-500/20 text-green-400",
      failed: "bg-red-500/20 text-red-400",
    };
    return colors[status] || colors.pending;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
          My Orders
        </h1>

        {/* Status Filter */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <select
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-background/50 border border-white/10 text-foreground focus:outline-none focus:border-primary/50"
            >
              {ORDER_STATUSES.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {ordersData.orders.length} of {ordersData.total} orders
          </div>
        </div>

        {loading ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your orders...</p>
          </div>
        ) : ordersData.orders.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Orders Yet</h3>
            <p className="text-muted-foreground mb-6">
              You haven't placed any orders yet. Browse our products to get started!
            </p>
            <Button variant="hero" onClick={() => navigate("/products")}>
              Browse Products
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {ordersData.orders.map((order) => (
              <div 
                key={order._id} 
                className="glass-card rounded-2xl p-6 cursor-pointer hover:border-primary/50 transition-all duration-300"
                onClick={() => navigate(`/orders/${order._id}`)}
              >
                {/* Order Header */}
                <div className="flex items-start justify-between mb-6 pb-4 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {formatDate(order.createdAt)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">₹{order.totalAmount}</div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium inline-block mt-2 ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Package className="h-4 w-4" />
                    <span>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span>
                  </div>
                  <div className="text-muted-foreground">
                    Ship to: {order.shippingAddress.city}, {order.shippingAddress.state}
                  </div>
                </div>
              </div>
            ))}
            </div>

            {/* Pagination */}
            {ordersData.totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {[...Array(ordersData.totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (
                    page === 1 ||
                    page === ordersData.totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "hero" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="text-muted-foreground">...</span>;
                  }
                  return null;
                })}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === ordersData.totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default MyOrders;
