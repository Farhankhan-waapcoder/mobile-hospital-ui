import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ShoppingBag, Star, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  stock: number;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

const CATEGORIES = [
  { value: "", label: "All Products" },
  { value: "cover", label: "Phone Covers" },
  { value: "skin", label: "Phone Skins" },
  { value: "charger", label: "Chargers" },
  { value: "earphone", label: "Earphones" },
  { value: "cable", label: "Cables" },
  { value: "holder", label: "Holders" },
  { value: "other", label: "Other" },
];

const Products = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [productsData, setProductsData] = useState<ProductsResponse>({
    products: [],
    total: 0,
    page: 1,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");

  const currentPage = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("page", currentPage.toString());
        params.append("limit", "10");
        if (selectedCategory) params.append("category", selectedCategory);
        if (searchTerm) params.append("search", searchTerm);

        const response = await fetch(`https://mobile-hospital-backend.onrender.com/api/products?${params}`);
        const data = await response.json();
        
        if (data.success) {
          setProductsData(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, selectedCategory, searchTerm]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    setSearchParams(params);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* Page Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            Our <span className="gradient-text">Products</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our collection of premium mobile accessories
          </p>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-background/50 border border-white/10 text-foreground focus:outline-none focus:border-primary/50"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {productsData.products.length} of {productsData.total} products
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="glass-card rounded-2xl p-3 md:p-6 animate-pulse">
                <div className="aspect-square bg-white/10 rounded-xl mb-4" />
                <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
                <div className="h-3 bg-white/10 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : productsData.products.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Products Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search term
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {productsData.products.map((product) => (
                <div
                  key={product._id}
                  className="glass-card rounded-xl md:rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 group cursor-pointer"
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
                    <span className={`absolute top-2 left-2 md:top-4 md:left-4 px-2 py-1 md:px-3 rounded-full text-xs font-medium ${getCategoryBadgeColor(product.category)}`}>
                      {product.category}
                    </span>
                    {/* Stock Badge */}
                    {product.stock < 10 && product.stock > 0 && (
                      <span className="absolute top-2 right-2 md:top-4 md:right-4 px-2 py-1 md:px-3 rounded-full bg-orange-500/20 text-orange-400 text-xs font-medium">
                        Only {product.stock} left
                      </span>
                    )}
                    {product.stock === 0 && (
                      <span className="absolute top-2 right-2 md:top-4 md:right-4 px-2 py-1 md:px-3 rounded-full bg-red-500/20 text-red-400 text-xs font-medium">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-3 md:p-6">
                    <h3 className="text-sm md:text-lg font-semibold text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-4 line-clamp-2 hidden md:block">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg md:text-2xl font-bold text-primary">₹{product.price}</span>
                      </div>
                      <div className="flex items-center gap-0.5 md:gap-1 text-yellow-400">
                        <Star className="h-3 w-3 md:h-4 md:w-4 fill-current" />
                        <Star className="h-3 w-3 md:h-4 md:w-4 fill-current" />
                        <Star className="h-3 w-3 md:h-4 md:w-4 fill-current" />
                        <Star className="h-3 w-3 md:h-4 md:w-4 fill-current" />
                        <Star className="h-3 w-3 md:h-4 md:w-4 fill-current opacity-30" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {productsData.totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {[...Array(productsData.totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (
                    page === 1 ||
                    page === productsData.totalPages ||
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
                  disabled={currentPage === productsData.totalPages}
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

export default Products;
