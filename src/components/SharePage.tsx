import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

interface SharePageProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SharePage = ({ open, onOpenChange }: SharePageProps) => {
  const { toast } = useToast();
  const { session } = useSessionContext();
  const url = session?.user ? `${window.location.origin}/storefront/${session.user.id}` : window.location.origin;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "URL copied to clipboard",
        description: "Share your page with others!",
      });
    } catch (err) {
      toast({
        title: "Failed to copy URL",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share your page</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input
            readOnly
            value={url}
            className="flex-1"
          />
          <Button
            type="button"
            size="icon"
            onClick={handleCopy}
            className="bg-primary hover:bg-primary/90"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};