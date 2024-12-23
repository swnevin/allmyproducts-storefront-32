import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Products } from "@/pages/dashboard/Products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "react-router-dom";

const Analytics = () => {
  // Example data - in a real app this would come from an API
  const analyticsData = {
    views: 12500,
    clicks: 3200,
    clickRate: "25.6%",
    topCountries: ["United States", "United Kingdom", "Germany"],
    popularProducts: [
      { name: "Product 1", views: 5000 },
      { name: "Product 2", views: 3000 },
      { name: "Product 3", views: 2000 },
    ]
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.views.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.clicks.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.clickRate}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Views Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Chart will be implemented here */}
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topCountries.map((country, index) => (
                <div key={country} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{country}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Appearance = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Appearance</h2>
      <div className="max-w-2xl">
        {/* We'll implement appearance settings in the next iteration */}
        <p>Appearance settings coming soon...</p>
      </div>
    </div>
  );
};

const Settings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>
      <div className="max-w-2xl">
        {/* We'll implement settings in the next iteration */}
        <p>Settings content coming soon...</p>
      </div>
    </div>
  );
};

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