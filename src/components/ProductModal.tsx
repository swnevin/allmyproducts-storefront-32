import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface Point {
  x: number;
  y: number;
  title: string;
  link: string;
}

interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
  points: Point[];
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal = ({ product, onClose }: ProductModalProps) => {
  if (!product) return null;

  return (
    <Dialog.Root open={!!product} onOpenChange={() => onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-overlayShow" />
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-4 shadow-lg animate-contentShow overflow-y-auto">
          <div className="relative">
            <img
              src={product.image}
              alt={product.title}
              className="w-full rounded-lg aspect-square object-cover"
            />
            {product.points.map((point, index) => (
              <div
                key={index}
                className="absolute"
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
              >
                <a
                  href={point.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block w-5 h-5 -mt-2.5 -ml-2.5"
                >
                  <div className="absolute inset-0 bg-white rounded-full" />
                  <div className="absolute inset-[3px] bg-[#ea384c] rounded-full" />
                  <div className="absolute inset-[6px] bg-white rounded-full" />
                </a>
                <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10">
                  <p className="text-sm font-medium animate-fade-in">{point.title}</p>
                  <a 
                    href={point.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-500 hover:text-gray-700 animate-fade-in"
                  >
                    {point.link.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 animate-scale-in">
            <h2 className="text-xl font-bold">{product.title}</h2>
            <div className="mt-1 space-y-1">
              {product.points.map((point, index) => (
                <div key={index} className="flex items-center space-x-2 animate-fade-in">
                  <span className="w-2 h-2 bg-[#ea384c] rounded-full"></span>
                  <span className="text-sm font-medium">{point.title}</span>
                  <a 
                    href={point.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    {point.link.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              ))}
            </div>
            <p className="mt-4 text-gray-600">{product.description}</p>
          </div>
          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 p-1 rounded-full bg-white/90 hover:bg-white"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};