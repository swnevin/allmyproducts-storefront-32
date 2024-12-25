import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Products } from "@/pages/dashboard/Products";
import { Analytics } from "@/pages/dashboard/Analytics";
import { Appearance } from "@/pages/dashboard/Appearance";
import { Settings } from "@/pages/dashboard/Settings";
import { Account } from "@/pages/dashboard/Account";
import { useLocation } from "react-router-dom";
import { useSessionContext } from "@supabase/auth-helpers-react";

const Dashboard = () => {
  const location = useLocation();
  const { isLoading } = useSessionContext();
  const currentPath = location.pathname.split('/').pop() || 'products';

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

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
      case 'account':
        return <Account />;
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