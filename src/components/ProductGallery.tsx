import { useState, useEffect } from "react";
import { ProductModal } from "./ProductModal";
import { JoinCreator } from "./JoinCreator";
import { SearchBar } from "./SearchBar";
import { supabase } from "@/integrations/supabase/client";
import { useParams } from "react-router-dom";
import { Product } from "@/types/product";

// Demo products for the example page
const demoProducts: Product[] = [
  {
    id: "demo1",
    title: "Minimalist Desk Setup",
    description: "Clean and productive workspace design",
    image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&auto=format&fit=crop",
    points: [
      { x: 25, y: 45, title: "Ergonomic Chair", link: "https://example.com/chair" },
      { x: 65, y: 35, title: "LED Desk Lamp", link: "https://example.com/lamp" }
    ],
    user_id: "demo",
    created_at: new Date().toISOString()
  },
  {
    id: "demo2",
    title: "Modern Living Room",
    description: "Contemporary living space with natural light",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop",
    points: [
      { x: 30, y: 50, title: "Modern Sofa", link: "https://example.com/sofa" },
      { x: 70, y: 40, title: "Coffee Table", link: "https://example.com/table" }
    ],
    user_id: "demo",
    created_at: new Date().toISOString()
  },
  {
    id: "demo3",
    title: "Kitchen Essentials",
    description: "Must-have kitchen tools and appliances",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&auto=format&fit=crop",
    points: [
      { x: 40, y: 60, title: "Stand Mixer", link: "https://example.com/mixer" },
      { x: 75, y: 45, title: "Coffee Machine", link: "https://example.com/coffee" }
    ],
    user_id: "demo",
    created_at: new Date().toISOString()
  }
];

export const ProductGallery = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const { userId } = useParams();

  useEffect(() => {
    const loadProducts = async () => {
      if (!userId) {
        // For demo page, use hardcoded demo products
        setAllProducts(demoProducts);
        setFilteredProducts(demoProducts);
        return;
      }

      // For user's page, load from database
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading products:', error);
        return;
      }

      if (products) {
        setAllProducts(products as Product[]);
        setFilteredProducts(products as Product[]);
      }
    };

    loadProducts();
  }, [userId]);

  const handleSearch = (query: string, filter: string) => {
    if (!query) {
      setFilteredProducts(allProducts);
      return;
    }

    const searchLower = query.toLowerCase();
    setFilteredProducts(
      allProducts.filter((product) => {
        switch (filter) {
          case "recent":
            return product.title.toLowerCase().includes(searchLower);
          case "popular":
            return product.description?.toLowerCase().includes(searchLower);
          default:
            return true;
        }
      })
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="relative aspect-square cursor-pointer overflow-hidden rounded-lg group shadow-md hover:shadow-lg transition-shadow"
              onClick={() => setSelectedProduct(product)}
            >
              <img
                src={product.image || '/placeholder.svg'}
                alt={product.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                <h3 className="absolute bottom-4 left-4 text-white font-semibold text-lg">
                  {product.title}
                </h3>
              </div>
              {product.points?.map((point, index) => (
                <div
                  key={index}
                  className="absolute w-5 h-5 -mt-2.5 -ml-2.5 cursor-pointer"
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                  title={point.title}
                >
                  <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75" />
                  <div className="absolute inset-0 bg-white rounded-full" />
                  <div className="absolute inset-[3px] bg-primary rounded-full" />
                  <div className="absolute inset-[6px] bg-white rounded-full" />
                </div>
              ))}
            </div>
          ))}
        </div>
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
        {!userId && <JoinCreator />}
      </div>
    </div>
  );
};