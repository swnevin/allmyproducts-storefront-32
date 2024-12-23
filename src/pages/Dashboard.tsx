import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Products } from "@/pages/dashboard/Products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const [displayName, setDisplayName] = useState("Sarah's Fashion Picks");
  const [bio, setBio] = useState("Fashion enthusiast sharing my favorite outfits and accessories. All products linked below!");
  const [selectedTheme, setSelectedTheme] = useState("default");
  const [avatarUrl, setAvatarUrl] = useState("https://images.unsplash.com/photo-1649972904349-6e44c42644a7");
  const { toast } = useToast();

  const themes = [
    { id: "default", name: "Default", color: "bg-primary" },
    { id: "blue", name: "Ocean Blue", color: "bg-blue-500" },
    { id: "green", name: "Forest Green", color: "bg-green-500" },
    { id: "purple", name: "Royal Purple", color: "bg-purple-500" },
  ];

  const handleSaveAppearance = () => {
    // In a real app, this would save to the backend
    toast({
      title: "Changes saved",
      description: "Your appearance settings have been updated.",
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, this would upload to a storage service
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Appearance</h2>
      <div className="max-w-2xl space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>PFP</AvatarFallback>
              </Avatar>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="avatar-upload"
                  onChange={handleImageUpload}
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("avatar-upload")?.click()}
                >
                  Change Image
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Theme</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedTheme === theme.id
                      ? "border-primary"
                      : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <div className={`w-full h-12 rounded-md ${theme.color} mb-2`} />
                  <p className="text-sm font-medium">{theme.name}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSaveAppearance} className="w-full">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

const Settings = () => {
  const [popupEnabled, setPopupEnabled] = useState(true);
  const { toast } = useToast();

  const handleSaveSettings = () => {
    // In a real app, this would save to the backend
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>
      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Page Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="popup-switch">AllMyLinks Popup</Label>
                <p className="text-sm text-muted-foreground">
                  Show a popup when visitors first arrive on your page
                </p>
              </div>
              <Switch
                id="popup-switch"
                checked={popupEnabled}
                onCheckedChange={setPopupEnabled}
              />
            </div>
            <Button onClick={handleSaveSettings} className="w-full">
              Save Changes
            </Button>
          </CardContent>
        </Card>
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
