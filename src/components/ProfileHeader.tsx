import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Facebook, Instagram, Twitter, Share2, TiktokIcon } from "lucide-react";

export const ProfileHeader = () => {
  return (
    <div className="flex flex-col items-center py-8 px-4">
      <Avatar className="w-24 h-24 mb-4">
        <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" />
        <AvatarFallback>CC</AvatarFallback>
      </Avatar>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Sarah's Fashion Picks</h1>
      <p className="text-gray-600 text-center max-w-md mb-4">
        Fashion enthusiast sharing my favorite outfits and accessories. All products linked below!
      </p>
      <div className="flex gap-4 items-center">
        <Facebook className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600" />
        <Instagram className="w-6 h-6 text-gray-600 cursor-pointer hover:text-pink-600" />
        <Twitter className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-400" />
        <TiktokIcon className="w-6 h-6 text-gray-600 cursor-pointer hover:text-black" />
        <Share2 className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
      </div>
    </div>
  );
};