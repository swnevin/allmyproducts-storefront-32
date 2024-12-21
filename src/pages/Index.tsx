import { ProfileHeader } from "@/components/ProfileHeader";
import { ProductGallery } from "@/components/ProductGallery";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader />
      <ProductGallery />
    </div>
  );
};

export default Index;