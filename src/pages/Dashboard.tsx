import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Products } from "@/pages/dashboard/Products";
import { Analytics } from "@/pages/dashboard/Analytics";
import { Appearance } from "@/pages/dashboard/Appearance";
import { Settings } from "@/pages/dashboard/Settings";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() || 'products';

  const renderContent = () => {
    switch (currentPath) {
      case 'products':
        return <Products />;
      case 'analytics':
        return <Analytics />;
      case 'appearance':
        return <Appearance />;
      case 'settings':
        return <Settings />;
      default:
        return <Products />;
    }
  };

  return (
    <DashboardLayout>
      {renderContent()}
    </DashboardLayout>
  );
};

export default Dashboard;