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
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-4 shadow-lg animate-contentShow">
          <div className="relative">
            <img
              src={product.image}
              alt={product.title}
              className="w-full rounded-lg"
            />
            {product.points.map((point, index) => (
              <a
                key={index}
                href={point.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute group"
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
              >
                <div className="relative w-6 h-6 -mt-3 -ml-3">
                  <div className="absolute inset-0 bg-white rounded-full" />
                  <div className="absolute inset-[2px] bg-[#ea384c] rounded-full" />
                  <div className="absolute inset-[4px] bg-white rounded-full" />
                </div>
                <div className="absolute left-8 top-1/2 -translate-y-1/2 bg-white px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {point.title}
                </div>
              </a>
            ))}
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-bold">{product.title}</h2>
            <p className="mt-2 text-gray-600">{product.description}</p>
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