import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Facebook, Instagram, Twitter, Share2 } from "lucide-react";

const TikTokIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    className="w-6 h-6 text-gray-600 cursor-pointer hover:text-black"
    fill="currentColor"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export const ProfileHeader = () => {
  return (
    <div className="flex flex-col items-center py-8 px-4 bg-white rounded-lg shadow-sm mb-8">
      <Avatar className="w-24 h-24 mb-4">
        <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop" />
        <AvatarFallback>SP</AvatarFallback>
      </Avatar>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Sarah's Fashion Picks</h1>
      <p className="text-gray-600 text-center max-w-md mb-4">
        Fashion enthusiast sharing my favorite outfits and accessories. All products linked below!
      </p>
      <div className="flex gap-4 items-center">
        <Facebook className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600" />
        <Instagram className="w-6 h-6 text-gray-600 cursor-pointer hover:text-pink-600" />
        <Twitter className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-400" />
        <TikTokIcon />
        <Share2 className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
      </div>
    </div>
  );
};