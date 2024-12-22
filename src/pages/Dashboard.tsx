import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Products } from "@/pages/dashboard/Products";
import { TabsContent } from "@/components/ui/tabs";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <TabsContent value="products">
        <Products />
      </TabsContent>
      <TabsContent value="analytics">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Analytics</h2>
          <p>Analytics content coming soon...</p>
        </div>
      </TabsContent>
      <TabsContent value="appearance">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Appearance</h2>
          <p>Appearance settings coming soon...</p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Settings</h2>
          <p>Settings content coming soon...</p>
        </div>
      </TabsContent>
    </DashboardLayout>
  );
};

export default Dashboard;