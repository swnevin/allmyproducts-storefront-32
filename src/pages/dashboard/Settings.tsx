import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const Settings = () => {
  const [popupEnabled, setPopupEnabled] = useState(true);
  const { toast } = useToast();

  const handleSaveSettings = () => {
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