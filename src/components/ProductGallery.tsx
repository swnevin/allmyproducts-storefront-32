import { useState, useEffect } from "react";
import { ProductModal } from "./ProductModal";
import { JoinCreator } from "./JoinCreator";
import { SearchBar } from "./SearchBar";
import { supabase } from "@/integrations/supabase/client";
import { useParams } from "react-router-dom";
import { Product } from "@/types/product";

export const ProductGallery = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const { userId } = useParams();

  useEffect(() => {
    const loadProducts = async () => {
      const { data: products } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', userId || '')
        .order('created_at', { ascending: false });

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
    <div className="container mx-auto px-4 min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg group"
            onClick={() => setSelectedProduct(product)}
          >
            <img
              src={product.image}
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
                <div className="absolute inset-0 bg-white rounded-full" />
                <div className="absolute inset-[3px] bg-[#ea384c] rounded-full" />
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
      <JoinCreator />
    </div>
  );
};