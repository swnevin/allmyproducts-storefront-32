import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Welcome to your dashboard</h1>
        <p>Start managing your products and analyze your performance.</p>
      </div>
    </DashboardLayout>
  );
};

export default Index;