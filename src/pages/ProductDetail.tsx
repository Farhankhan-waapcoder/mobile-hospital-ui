import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, ShoppingBag, Package, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  stock: number;
  createdAt: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://mobile-hospital-backend.onrender.com/api/products/${id}`);
        const data = await response.json();
        
        if (data.success) {
          setProduct(data.data);
        } else {
          navigate("/products");
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, navigate]);

  const getCategoryBadgeColor = (category: string) => {
    const colors: { [key: string]: string } = {
      cover: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      skin: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      charger: "bg-green-500/20 text-green-400 border-green-500/30",
      earphone: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      cable: "bg-pink-500/20 text-pink-400 border-pink-500/30",
      holder: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
      other: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    };
    return colors[category] || colors.other;
  };

  const handleWhatsAppInquiry = () => {
    if (!product) return;
    const message = `Hi! I'm interested in:\n${product.name}\nPrice: ₹${product.price}\n\nIs this available?`;
    window.open(`https://wa.me/919569990341?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 animate-pulse">
            <div className="aspect-square bg-white/10 rounded-2xl" />
            <div className="space-y-6">
              <div className="h-8 bg-white/10 rounded w-3/4" />
              <div className="h-4 bg-white/10 rounded w-1/2" />
              <div className="h-20 bg-white/10 rounded" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate("/products")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="glass-card rounded-2xl overflow-hidden aspect-square bg-gradient-to-br from-primary/10 to-[hsl(160,84%,39%)]/10">
              {product.images.length > 0 ? (
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag className="h-32 w-32 text-primary/30" />
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`glass-card rounded-lg overflow-hidden aspect-square ${
                      selectedImage === index ? "border-2 border-primary" : ""
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Category Badge */}
            <div className="flex items-center gap-3">
              <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getCategoryBadgeColor(product.category)}`}>
                <Tag className="inline h-4 w-4 mr-1" />
                {product.category}
              </span>
              {product.stock < 10 && product.stock > 0 && (
                <span className="px-4 py-2 rounded-full bg-orange-500/20 text-orange-400 text-sm font-medium border border-orange-500/30">
                  Only {product.stock} left
                </span>
              )}
              {product.stock === 0 && (
                <span className="px-4 py-2 rounded-full bg-red-500/20 text-red-400 text-sm font-medium border border-red-500/30">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Product Name */}
            <h1 className="text-4xl font-bold text-foreground">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current opacity-30" />
              </div>
              <span className="text-muted-foreground">(4.0)</span>
            </div>

            {/* Price */}
            <div className="glass-card p-6 rounded-xl">
              <div className="text-sm text-muted-foreground mb-1">Price</div>
              <div className="text-4xl font-bold text-primary">₹{product.price}</div>
            </div>

            {/* Description */}
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Stock Info */}
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold text-foreground">Availability</div>
                  <div className="text-sm text-muted-foreground">
                    {product.stock > 0 ? `${product.stock} units in stock` : "Out of stock"}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={handleWhatsAppInquiry}
                disabled={product.stock === 0}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Inquire on WhatsApp
              </Button>
              <Button
                variant="heroOutline"
                size="lg"
                className="w-full"
                asChild
              >
                <a href="tel:+919569990341">
                  Call to Order: +91 9569990341
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductDetail;
