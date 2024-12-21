import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ProfileHeader = () => {
  return (
    <div className="flex flex-col items-center py-8 px-4">
      <Avatar className="w-24 h-24 mb-4">
        <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" />
        <AvatarFallback>CC</AvatarFallback>
      </Avatar>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Sarah's Fashion Picks</h1>
      <p className="text-gray-600 text-center max-w-md">
        Fashion enthusiast sharing my favorite outfits and accessories. All products linked below!
      </p>
    </div>
  );
};