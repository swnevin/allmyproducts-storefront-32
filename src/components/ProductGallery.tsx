import { useState } from "react";
import { ProductModal } from "./ProductModal";
import { JoinCreator } from "./JoinCreator";
import { SearchBar } from "./SearchBar";

interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
  points: Array<{
    x: number;
    y: number;
    title: string;
    link: string;
  }>;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
    title: "Summer Casual",
    description: "My go-to summer outfit featuring sustainable brands",
    points: [
      { x: 20, y: 30, title: "Eco Denim Jacket", link: "https://example.com/jacket" },
      { x: 50, y: 70, title: "Hemp Pants", link: "https://example.com/pants" },
    ],
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    title: "Spring Collection",
    description: "Light and airy pieces perfect for spring",
    points: [
      { x: 30, y: 40, title: "Floral Dress", link: "https://example.com/dress" },
      { x: 60, y: 80, title: "Leather Sandals", link: "https://example.com/sandals" },
    ],
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc",
    title: "Autumn Vibes",
    description: "Cozy and stylish autumn essentials",
    points: [
      { x: 25, y: 35, title: "Wool Sweater", link: "https://example.com/sweater" },
      { x: 55, y: 75, title: "Boots", link: "https://example.com/boots" },
    ],
  },
];

export const ProductGallery = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);

  const handleSearch = (query: string, filter: string) => {
    if (!query) {
      setFilteredProducts(PRODUCTS);
      return;
    }

    const searchLower = query.toLowerCase();
    setFilteredProducts(
      PRODUCTS.filter((product) => {
        switch (filter) {
          case "recent":
            return product.title.toLowerCase().includes(searchLower);
          case "popular":
            return product.description.toLowerCase().includes(searchLower);
          default:
            return true;
        }
      })
    );
  };

  return (
    <div className="container mx-auto px-4">
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
              <h3 className="absolute bottom-4 left-4 text-white font-semibold text-lg">{product.title}</h3>
            </div>
            {product.points.map((point, index) => (
              <div
                key={index}
                className="absolute w-5 h-5 -mt-2.5 -ml-2.5 cursor-pointer group/point"
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                title={point.title}
              >
                <div className="absolute inset-0 bg-white rounded-full" />
                <div className="absolute inset-[3px] bg-[#ea384c] rounded-full" />
                <div className="absolute inset-[6px] bg-white rounded-full" />
                <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10 opacity-0 scale-95 group-hover/point:opacity-100 group-hover/point:scale-100 transition-all duration-200 origin-left">
                  <p className="text-sm font-medium">{point.title}</p>
                  <a 
                    href={point.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-500 hover:text-gray-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {point.link.replace(/^https?:\/\//, '')}
                  </a>
                </div>
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