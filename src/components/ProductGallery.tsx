import { useState, useEffect } from "react";
import { ProductModal } from "./ProductModal";
import { JoinCreator } from "./JoinCreator";
import { SearchBar } from "./SearchBar";
import { supabase } from "@/integrations/supabase/client";
import { useParams } from "react-router-dom";
import { Product } from "@/types/product";
import { ProfileHeader } from "./ProfileHeader";

// Demo products for the example page
const demoProducts: Product[] = [
  {
    id: "demo1",
    title: "Summer Fashion Essentials",
    description: "My favorite summer dress paired with trendy accessories",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop",
    points: [
      { x: 35, y: 45, title: "Floral Maxi Dress", link: "https://example.com/dress" },
      { x: 65, y: 25, title: "Gold Necklace", link: "https://example.com/necklace" },
      { x: 50, y: 75, title: "Strappy Sandals", link: "https://example.com/sandals" }
    ],
    user_id: "demo",
    created_at: new Date().toISOString()
  },
  {
    id: "demo2",
    title: "Office Style Guide",
    description: "Professional yet comfortable workwear outfit",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop",
    points: [
      { x: 30, y: 40, title: "Blazer", link: "https://example.com/blazer" },
      { x: 45, y: 60, title: "Pencil Skirt", link: "https://example.com/skirt" },
      { x: 70, y: 35, title: "Statement Earrings", link: "https://example.com/earrings" }
    ],
    user_id: "demo",
    created_at: new Date().toISOString()
  },
  {
    id: "demo3",
    title: "Weekend Casual Look",
    description: "Comfortable and stylish weekend outfit ideas",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop",
    points: [
      { x: 40, y: 35, title: "Denim Jacket", link: "https://example.com/jacket" },
      { x: 55, y: 65, title: "White Sneakers", link: "https://example.com/sneakers" },
      { x: 75, y: 45, title: "Crossbody Bag", link: "https://example.com/bag" }
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
        setAllProducts(products);
        setFilteredProducts(products);
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
        {!userId && <ProfileHeader />}
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