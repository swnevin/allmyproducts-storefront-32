import { Logo } from "@/components/Logo";
import { SharePage } from "@/components/SharePage";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Menu, Share2, Settings, BarChart3, Package2, Paintbrush, UserCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const menuItems = [
  { title: "Products", icon: Package2, value: "products" },
  { title: "Analytics", icon: BarChart3, value: "analytics" },
  { title: "Appearance", icon: Paintbrush, value: "appearance" },
  { title: "Settings", icon: Settings, value: "settings" },
];

const DashboardSidebarContent = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <SidebarHeader className="border-b p-4">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <button onClick={() => navigate(`/dashboard/${item.value}`)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <UserCircle className="h-5 w-5" />
              <span>Profile</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem 
              className="text-muted-foreground cursor-not-allowed"
              disabled
            >
              Create a new AllMyProducts page
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-muted-foreground cursor-not-allowed"
              disabled
            >
              My account
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/billing")}>
              Billing
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-muted-foreground cursor-not-allowed"
              disabled
            >
              Contact support
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-muted-foreground cursor-not-allowed"
              disabled
            >
              Help Center
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-muted-foreground cursor-not-allowed"
              disabled
            >
              Submit feedback
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-muted-foreground cursor-not-allowed"
              disabled
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </>
  );
};

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="fixed top-4 left-4">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <DashboardSidebarContent />
            </SheetContent>
          </Sheet>
        ) : (
          <Sidebar>
            <DashboardSidebarContent />
          </Sidebar>
        )}

        <div className="flex-1 overflow-auto">
          <div className="flex justify-end p-4 border-b">
            <Button
              onClick={() => setIsShareOpen(true)}
              variant="outline"
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
          <main className="p-6">
            {children}
          </main>
        </div>
        <SharePage open={isShareOpen} onOpenChange={setIsShareOpen} />
      </div>
    </SidebarProvider>
  );
};