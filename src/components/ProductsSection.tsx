import { useState, useEffect } from "react";
import { ShoppingBag, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  stock: number;
}

const ProductsSection = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://mobile-hospital-backend.onrender.com/api/products?limit=6");
        const data = await response.json();
        if (data.success) {
          setProducts(data.data.products);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getCategoryBadgeColor = (category: string) => {
    const colors: { [key: string]: string } = {
      cover: "bg-blue-500/20 text-blue-400",
      skin: "bg-purple-500/20 text-purple-400",
      charger: "bg-green-500/20 text-green-400",
      earphone: "bg-yellow-500/20 text-yellow-400",
      cable: "bg-pink-500/20 text-pink-400",
      holder: "bg-indigo-500/20 text-indigo-400",
      other: "bg-gray-500/20 text-gray-400",
    };
    return colors[category] || colors.other;
  };

  return (
    <section id="products" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-dark-800/30 to-background" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Our Products
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Mobile <span className="gradient-text">Accessories</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Premium quality mobile accessories for your smartphone. Covers, chargers, earphones, and more.
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 animate-pulse">
                <div className="aspect-square bg-white/10 rounded-xl mb-4" />
                <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
                <div className="h-3 bg-white/10 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="glass-card rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 group cursor-pointer"
                onClick={() => navigate(`/products/${product._id}`)}
              >
                {/* Product Image */}
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-[hsl(160,84%,39%)]/10 relative overflow-hidden">
                  {product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="h-20 w-20 text-primary/30" />
                    </div>
                  )}
                  {/* Category Badge */}
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${getCategoryBadgeColor(product.category)}`}>
                    {product.category}
                  </span>
                  {/* Stock Badge */}
                  {product.stock < 10 && product.stock > 0 && (
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-medium">
                      Only {product.stock} left
                    </span>
                  )}
                  {product.stock === 0 && (
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current opacity-30" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            variant="hero"
            size="lg"
            onClick={() => navigate("/products")}
            className="group"
          >
            View All Products
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
